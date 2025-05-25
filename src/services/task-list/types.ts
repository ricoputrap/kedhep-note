import { ITaskItem } from "../task-item/types";
import { IGetMultipleParams } from "../types";

export interface ITaskList {
  id: number,
  title: string,
  tags: string[],
  user_id: number, // FK to IUser.id
  created_at: number,
  updated_at: number,
  deleted_at: number | null,
  task_items?: ITaskItem[]; // Optional, populated when isIncludeTaskItems is true
}

export interface IGetAllTaskListParams extends IGetMultipleParams {
  isIncludeTaskItems?: boolean;
}

export interface ITaskListService {
  getAllTaskList: (userId: number, params: IGetAllTaskListParams) => Promise<ITaskList[]>;
  createTaskList: (userId: number, title: string) => Promise<ITaskList>;
  editTaskListTitle: (userId: number, taskGroupId: number, title: string) => Promise<ITaskList>;
  editTaskListTags: (userId: number, taskGroupId: number, tags: string[]) => Promise<ITaskList>;
  deleteTaskList: (userId: number, taskGroupId: number) => Promise<void>;
}