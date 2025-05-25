import { dbTaskList, dbTaskItem } from "@/db";
import { ITaskItem, ITaskItemService } from "./types";

const taskItemService: ITaskItemService = {
  async createTaskItem(userId, taskGroupId, content) {

    // Check if the task group exists
    const taskGroup = dbTaskList.find(list => list.id === taskGroupId && list.deleted_at === null);
    if (!taskGroup) throw new Error("Task group not found");

    // construct the new task item
    const now = Date.now();

    // positions: [0, 10, 20, ...]
    const GAP = 10; // Gap between positions
    const totalItems = dbTaskItem.filter(item => item.task_group_id === taskGroupId && item.deleted_at === null).length;
    const position = totalItems > 0 ? (totalItems - 1 + GAP) : 0;

    const newItem: ITaskItem = {
      id: now + Math.floor(Math.random() * 1000),
      content,
      is_completed: false,
      position,
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

  async reorderTaskItem(id, taskGroupId, position) {
    const indexOfTaskItem = dbTaskItem.findIndex(item => item.id == id && item.deleted_at === null);
    if (indexOfTaskItem === -1) throw new Error("Task item not found");

    // get all task items in the group, sorted by position
    const itemsInGroup = dbTaskItem
      .filter(item => item.task_group_id === taskGroupId && item.deleted_at === null)
      .sort((a, b) => a.position - b.position);
    if (itemsInGroup.length === 0) throw new Error("No task items found in this group");

    // Check if the new position is valid
    if (position < 0 || position >= itemsInGroup.length) {
      throw new Error("Invalid new position for reordering");
    }

    // Find the item to reorder
    const itemIndex = itemsInGroup.findIndex(item => item.id === id);
    if (itemIndex === -1) throw new Error("Task item not found for reordering");
    const itemToReorder = itemsInGroup[itemIndex];

    // Remove the item from its current position
    itemsInGroup.splice(itemIndex, 1);

    // Insert it at the new position
    itemsInGroup.splice(position, 0, itemToReorder);

    // Assign a new position using gap-based indexing
    const GAP = 10; // Gap between positions
    let newPosition = 0;

    /// If moved to the start: `newPosition` is set to just before the next item's position
    // or 0 if it's the only item
    if (position === 0) {
      newPosition = itemsInGroup[1] ? itemsInGroup[1].position - GAP : 0;
      if (newPosition < 0) newPosition = 0;
    }
    // If moved to the end: `newPosition` is set to just after the previous item's position.
    else if (position === itemsInGroup.length - 1) {
      newPosition = itemsInGroup[position - 1].position + GAP;
    }
    // If moved between two items: `newPosition` is set to the average
    // of the positions of the items before and after the new spot.
    else {
      const prev = itemsInGroup[position - 1].position;
      const next = itemsInGroup[position + 1].position;
      newPosition = Math.floor((prev + next) / 2);
    }

    itemToReorder.position = newPosition;
    itemToReorder.updated_at = Date.now();

    // If gap is too small (positions are not unique or too close), rebalance
    const MIN_GAP = 2; // Minimum gap to trigger rebalance
    let needsRebalance = false;
    for (let i = 1; i < itemsInGroup.length; i++) {
      if (itemsInGroup[i].position - itemsInGroup[i - 1].position < MIN_GAP) {
        needsRebalance = true;
        break;
      }
    }

    // If rebalancing is needed, reset positions to 0, 10, 20, ...
    // TODO wrap this in a transaction if using a real database
    // TODO do batch update if using a real database
    // TODO use background job for rebalancing if many items to avoid blocking
    if (needsRebalance) {
      for (let i = 0; i < itemsInGroup.length; i++) {
        itemsInGroup[i].position = i * GAP;
        itemsInGroup[i].updated_at = Date.now();

        // Update in dbTaskItem
        const dbIndex = dbTaskItem.findIndex(item => item.id === itemsInGroup[i].id && item.deleted_at === null);
        if (dbIndex !== -1) {
          dbTaskItem[dbIndex] = {
            ...dbTaskItem[dbIndex],
            position: itemsInGroup[i].position,
            updated_at: itemsInGroup[i].updated_at,
          };
        }
      }
    }
    // Only update the moved item in `dbTaskItem`
    else {
      dbTaskItem[indexOfTaskItem] = {
        ...dbTaskItem[indexOfTaskItem],
        position: itemToReorder.position,
        updated_at: itemToReorder.updated_at,
      };
    }

    return itemToReorder;
  }
}

export default taskItemService;