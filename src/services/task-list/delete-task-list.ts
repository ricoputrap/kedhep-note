import { dbTaskList } from "@/db";

/**
 * Soft delete a task list by setting its deleted_at timestamp.
 * @param userId - The ID of the user who owns the task list.
 * @param taskGroupId - The ID of the task list to delete.
 * @returns A promise that resolves when the task list is deleted.
 * @throws Error if the task list is not found.
 */
export default async function deleteTaskList(userId: number, taskGroupId: number): Promise<void> {
  const index = dbTaskList.findIndex(listItem => {
    return listItem.id === taskGroupId &&
      listItem.deleted_at === null &&
      listItem.user_id === userId;
  });
  if (index === -1) throw new Error("Task list not found");

  dbTaskList[index] = {
    ...dbTaskList[index],
    deleted_at: Date.now(),
  };
}
