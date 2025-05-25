import { dbTaskItem } from "@/db";

/**
 * Edit the title/content of a task item.
 * @param id - The ID of the task item to edit.
 * @param content - The new content/title for the task item.
 * @returns The updated task item.
 * @throws Error if the task item does not exist.
 */
export default async function editTaskItemTitle(id: number, content: string) {
  const index = dbTaskItem.findIndex(taskItem => taskItem.id === id && taskItem.deleted_at === null);
  if (index === -1) throw new Error("Task item not found");

  dbTaskItem[index].content = content;
  dbTaskItem[index].updated_at = Date.now();
  return dbTaskItem[index];
}
