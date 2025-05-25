import { dbTaskItem } from "@/db";

/**
 * Edit the completion status of a task item.
 * @param id - The ID of the task item to edit.
 * @param is_completed - The new completion status.
 * @returns The updated task item.
 * @throws Error if the task item does not exist.
 */
export default async function editTaskItemCompletion(id: number, is_completed: boolean) {
  const index = dbTaskItem.findIndex(taskItem => taskItem.id === id && taskItem.deleted_at === null);
  if (index === -1) throw new Error("Task item not found");

  dbTaskItem[index].is_completed = is_completed;
  dbTaskItem[index].updated_at = Date.now();
  return dbTaskItem[index];
}
