import { dbTaskList } from "@/db";
import { ITaskList } from "./types";

/**
 * Edit the tags of a task list.
 * @param userId - The ID of the user who owns the task list.
 * @param taskGroupId - The ID of the task list to edit.
 * @param tags - The new tags for the task list.
 * @returns The updated task list.
 * @throws Error if the task list is not found.
 */
export default async function editTaskListTags(userId: number, taskGroupId: number, tags: string[]): Promise<ITaskList> {
  const index = dbTaskList.findIndex(listItem => {
    return listItem.id === taskGroupId &&
      listItem.deleted_at === null &&
      listItem.user_id === userId;
  });
  if (index === -1) throw new Error("Task list not found");

  dbTaskList[index] = {
    ...dbTaskList[index],
    tags,
    updated_at: Date.now(),
  };
  return dbTaskList[index];
}
