import { dbTaskItem, dbTaskList } from "@/db";
import { ITaskList, IGetAllTaskListParams } from "./types";

/**
 * Get all task lists for a user, with optional filtering and inclusion of task items.
 * @param userId - The ID of the user whose task lists to retrieve.
 * @param params - Optional filters and options for retrieval.
 * @returns A promise that resolves to an array of task lists.
 */
export default async function getAllTaskList(userId: number, params: IGetAllTaskListParams): Promise<ITaskList[]> {
  let lists = dbTaskList.filter(list => list.deleted_at === null && list.user_id === userId);

  if (params?.tags && params.tags.length > 0) {
    lists = lists.filter(list => params.tags!.every(tag => list.tags.includes(tag)));
  }

  if (params?.search) {
    lists = lists.filter(list => list.title.toLowerCase().includes(params.search!.toLowerCase()));
  }

  if (params?.isIncludeTaskItems) {
    lists = lists.map(list => ({
      ...list,
      task_items: dbTaskItem
        .filter(item => item.task_group_id === list.id && item.deleted_at === null)
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    }));
  }

  return lists;
}
