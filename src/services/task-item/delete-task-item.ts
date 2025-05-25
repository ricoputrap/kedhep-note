import { dbTaskItem } from "@/db";

/**
 * Soft delete a task item by setting its deleted_at timestamp.
 * @param id - The ID of the task item to delete.
 * @throws Error if the task item does not exist.
 */
export default async function deleteTaskItem(id: number) {
  const index = dbTaskItem.findIndex(taskItem => taskItem.id === id && taskItem.deleted_at === null);
  if (index === -1) throw new Error("Task item not found");
  dbTaskItem[index].deleted_at = Date.now();
}
