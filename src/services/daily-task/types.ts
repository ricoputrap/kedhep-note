import { IGetMultipleParams } from "../types";

/**
 * Type definition of a daily task item.
 * This model has a one-to-one relationship with ITaskItem
 */
export interface IDailyTaskItem {
  id: number,             // FK to ITaskItem.id
  is_completed: boolean,
  created_at: number,
  updated_at: number,
  deleted_at: number | null,
}

interface IGetDailyTasksParams extends IGetMultipleParams {
  date: number;
}

export interface IDailyTaskService {
  getDailyTasksByDate: (userId: number, params: IGetDailyTasksParams) => Promise<IDailyTaskItem[]>;
  addDailyTask: (userId: number, taskItemId: number, date: number) => Promise<IDailyTaskItem>;
  editDailyTaskCompletion: (userId: number, taskItemId: number, date: number, is_completed: boolean) => Promise<IDailyTaskItem>;
  editDailyTaskContent: (userId: number, taskItemId: number, date: number, content: string) => Promise<IDailyTaskItem>;
  deleteDailyTask: (userId: number, taskItemId: number, date: number) => Promise<void>;
}