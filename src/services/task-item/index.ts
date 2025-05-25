import { dbTaskList, dbTaskItem } from "@/db";
import { ITaskItem, ITaskItemService } from "./types";

const taskItemService: ITaskItemService = {
  async createTaskItem(userId, taskGroupId, content) {
    // Check if the task group exists
    const taskGroup = dbTaskList.find(list => list.id === taskGroupId && list.deleted_at === null);
    if (!taskGroup) throw new Error("Task group not found");

    // construct the new task item
    const now = Date.now();
    const newItem: ITaskItem = {
      id: now + Math.floor(Math.random() * 1000),
      content,
      is_completed: false,
      position: dbTaskList.find(list => list.id == taskGroupId)?.task_items?.length || 0, // Default position based on existing items
      task_group_id: taskGroupId,
      user_id: userId,
      created_at: now,
      updated_at: now,
      deleted_at: null
    };

    // add the new item to the database
    dbTaskItem.push(newItem);

    // Return the newly created item
    return newItem;
  },

  async editTaskItemTitle(id, content) {
    const index = dbTaskItem.findIndex(taskItem => taskItem.id === id && taskItem.deleted_at === null);
    if (index === -1) throw new Error("Task item not found");

    // Update the content and timestamp
    dbTaskItem[index].content = content;
    dbTaskItem[index].updated_at = Date.now();

    // Return the updated item
    return dbTaskItem[index];
  },

  async editTaskItemCompletion(id, is_completed) {
    const index = dbTaskItem.findIndex(taskItem => taskItem.id === id && taskItem.deleted_at === null);
    if (index === -1) throw new Error("Task item not found");

    // Update the completion status and timestamp
    dbTaskItem[index].is_completed = is_completed;
    dbTaskItem[index].updated_at = Date.now();

    // Return the updated item
    return dbTaskItem[index];
  },

  async deleteTaskItem(id) {
    const index = dbTaskItem.findIndex(taskItem => taskItem.id === id && taskItem.deleted_at === null);
    if (index === -1) throw new Error("Task item not found");

    // Soft delete the item by setting deleted_at to current timestamp
    dbTaskItem[index].deleted_at = Date.now();
  },

  async reorderTaskItem(id, taskGroupId, newPosition) {
    const indexOfTaskItem = dbTaskItem.findIndex(item => item.id == id && item.deleted_at === null);
    if (indexOfTaskItem === -1) throw new Error("Task item not found");

    // get all task items in the group
    const itemsInGroup = dbTaskItem
      .filter(item => item.task_group_id === taskGroupId && item.deleted_at === null)
      .sort((a, b) => a.position - b.position);
    if (itemsInGroup.length === 0) throw new Error("No task items found in this group");

    // Check if the new position is valid
    if (newPosition < 0 || newPosition >= itemsInGroup.length) {
      throw new Error("Invalid new position for reordering");
    }

    // Find the item to reorder
    const itemIndex = itemsInGroup.findIndex(item => item.id === id);
    if (itemIndex === -1) throw new Error("Task item not found for reordering");
    const itemToReorder = itemsInGroup[itemIndex];

    // Remove the item from its current position
    itemsInGroup.splice(itemIndex, 1);

    // Insert it at the new position
    itemsInGroup.splice(newPosition, 0, itemToReorder);

    /**
     * Initially, the value of `position` is exactly the same as the index in the array.
     * When a task item is reordered, we need to update its position.
     * 
     * Example 1:
     * positions = [{ position: 0 }, { position: 1 }, { position: 2 }, { position: 3 }]
     * 
     * If we move item at index 2 to position 1, the new positions will be:
     * positions = [{ position: 0 }, { position: 1 }, { position: 0.5 }, { position: 3 }]
     * ordered_positions = [{ position: 0 }, { position: 0.5 }, { position: 1 }, { position: 3 }]
     * 0.5 comes from the average both neighboring positions: (0 + 1) / 2 = 0.5
     * 
     * If we move again the item at index 0 to 2
     * positions = [{ position: 2 }, { position: 0.5 }, { position: 1 }, { position: 3 }]
     * positions = [{ position: 0.5 }, { position: 1 }, { position: 2 }, { position: 3 }]
     */

    // The item is moved to the top of the list.
    // That means the next item was previously the first item in the group.
    if (newPosition === 0) {
      itemToReorder.position = newPosition;

      // swap `position` if there are only 2 tasks in the group
      if (itemsInGroup.length === 2) {
        itemsInGroup[newPosition + 1].position = 1;
      }
      else {
        // set the new position of the next item to be the half of the position of the next 2 item
        itemsInGroup[newPosition + 1].position = itemsInGroup[newPosition + 2].position / 2;
      }

      // update the position of the next item in the database
      const nextItemIndex = dbTaskItem.findIndex(item => item.id === itemsInGroup[newPosition + 1].id && item.deleted_at === null);
      if (nextItemIndex !== -1) {
        dbTaskItem[nextItemIndex] = {
          ...dbTaskItem[nextItemIndex],
          position: itemsInGroup[newPosition + 1].position,
          updated_at: Date.now(),
        };
      }
    }
    // the item is moved to the last position of the list
    else if (newPosition === itemsInGroup.length - 1) {
      itemToReorder.position = newPosition;

      // swap `position` if there are only 2 tasks in the group
      if (itemsInGroup.length === 2) {
        itemsInGroup[newPosition - 1].position = 0;
      }
      else {
        // set the new position of the prev item to be the average between the `position`
        // of the current item and the prev 2 item
        itemsInGroup[newPosition - 1].position = (itemsInGroup[newPosition - 2].position + newPosition) / 2;
      }

      // update the position of the prev item in the database
      const prevItemIndex = dbTaskItem.findIndex(item => item.id === itemsInGroup[newPosition - 1].id && item.deleted_at === null);
      if (prevItemIndex !== -1) {
        dbTaskItem[prevItemIndex] = {
          ...dbTaskItem[prevItemIndex],
          position: itemsInGroup[newPosition - 1].position,
          updated_at: Date.now(),
        };
      }
    }
    else {
      itemToReorder.position = (itemsInGroup[newPosition - 1].position + itemsInGroup[newPosition + 1].position) / 2;
    }

    // update the position of this item in the database
    dbTaskItem[indexOfTaskItem] = {
      ...dbTaskItem[indexOfTaskItem],
      position: itemToReorder.position,
      updated_at: Date.now(),
    };

    return itemToReorder;
  }
}

export default taskItemService;