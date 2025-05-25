import { dbTaskList } from "@/db";
import { ITaskList } from "./types";

/**
 * Create a new task list for a user.
 * @param userId - The ID of the user creating the task list.
 * @param title - The title of the new task list.
 * @returns The newly created task list.
 */
export default async function createTaskList(userId: number, title: string): Promise<ITaskList> {
  const now = Date.now();
  const newList: ITaskList = {
    id: now + Math.floor(Math.random() * 1000),
    title,
    tags: [],
    user_id: userId,
    created_at: now,
    updated_at: now,
    deleted_at: null,
  };
  dbTaskList.push(newList);
  return newList;
}
