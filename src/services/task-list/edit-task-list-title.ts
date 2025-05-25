import { dbTaskList } from "@/db";
import { ITaskList } from "./types";

/**
 * Edit the title of a task list.
 * @param userId - The ID of the user who owns the task list.
 * @param taskGroupId - The ID of the task list to edit.
 * @param title - The new title for the task list.
 * @returns The updated task list.
 * @throws Error if the task list is not found.
 */
export default async function editTaskListTitle(userId: number, taskGroupId: number, title: string): Promise<ITaskList> {
  const index = dbTaskList.findIndex(listItem => {
    return listItem.id === taskGroupId &&
      listItem.deleted_at === null &&
      listItem.user_id === userId;
  });
  if (index === -1) throw new Error("Task list not found");

  dbTaskList[index] = {
    ...dbTaskList[index],
    title,
    updated_at: Date.now(),
  };
  return dbTaskList[index];
}
