import { dbTaskItem } from "@/db";

/**
 * Reorder a task item within its group using gap-based indexing.
 * Only updates the moved item's position unless a rebalance is needed.
 * If gaps between positions become too small, rebalances all items in the group.
 * @param id - The ID of the task item to reorder.
 * @param taskGroupId - The ID of the task group containing the item.
 * @param newPosition - The new position index within the group.
 * @returns The reordered task item.
 * @throws Error if the task item or group does not exist, or if the new position is invalid.
 */
export default async function reorderTaskItem(id: number, taskGroupId: number, newPosition: number) {
  const indexOfTaskItem = dbTaskItem.findIndex(item => item.id == id && item.deleted_at === null);
  if (indexOfTaskItem === -1) throw new Error("Task item not found");

  const itemsInGroup = dbTaskItem
    .filter(item => item.task_group_id === taskGroupId && item.deleted_at === null)
    .sort((a, b) => a.position - b.position);
  if (itemsInGroup.length === 0) throw new Error("No task items found in this group");

  if (newPosition < 0 || newPosition >= itemsInGroup.length) {
    throw new Error("Invalid new position for reordering");
  }

  const itemIndex = itemsInGroup.findIndex(item => item.id === id);
  if (itemIndex === -1) throw new Error("Task item not found for reordering");
  const itemToReorder = itemsInGroup[itemIndex];

  itemsInGroup.splice(itemIndex, 1);
  itemsInGroup.splice(newPosition, 0, itemToReorder);

  const GAP = 10;
  let newPos = 0;

  if (newPosition === 0) {
    newPos = itemsInGroup[1] ? itemsInGroup[1].position - GAP : 0;
    if (newPos < 0) newPos = 0;
  } else if (newPosition === itemsInGroup.length - 1) {
    newPos = itemsInGroup[newPosition - 1].position + GAP;
  } else {
    const prev = itemsInGroup[newPosition - 1].position;
    const next = itemsInGroup[newPosition + 1].position;
    newPos = Math.floor((prev + next) / 2);
  }

  itemToReorder.position = newPos;
  itemToReorder.updated_at = Date.now();

  const MIN_GAP = 2;
  let needsRebalance = false;
  for (let i = 1; i < itemsInGroup.length; i++) {
    if (itemsInGroup[i].position - itemsInGroup[i - 1].position < MIN_GAP) {
      needsRebalance = true;
      break;
    }
  }

  if (needsRebalance) {
    for (let i = 0; i < itemsInGroup.length; i++) {
      itemsInGroup[i].position = i * GAP;
      itemsInGroup[i].updated_at = Date.now();
      const dbIndex = dbTaskItem.findIndex(item => item.id === itemsInGroup[i].id && item.deleted_at === null);
      if (dbIndex !== -1) {
        dbTaskItem[dbIndex] = {
          ...dbTaskItem[dbIndex],
          position: itemsInGroup[i].position,
          updated_at: itemsInGroup[i].updated_at,
        };
      }
    }
  } else {
    dbTaskItem[indexOfTaskItem] = {
      ...dbTaskItem[indexOfTaskItem],
      position: itemToReorder.position,
      updated_at: itemToReorder.updated_at,
    };
  }

  return itemToReorder;
}
