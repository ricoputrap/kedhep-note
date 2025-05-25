import { dbTaskItem, dbTaskList } from "../../db";
import { ITaskItem } from "./types";

/**
 * Create a new task item in the specified task group using gap-based indexing for position.
 * @param userId - The ID of the user creating the task item.
 * @param taskGroupId - The ID of the task group to add the item to.
 * @param content - The content/title of the task item.
 * @returns The newly created task item.
 * @throws Error if the task group does not exist.
 */
export default function createTaskItem(userId: number, taskGroupId: number, content: string): Promise<ITaskItem> {
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
  return Promise.resolve(newItem);
}