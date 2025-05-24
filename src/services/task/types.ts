interface ITaskItem {
  id: number,
  content: string,
  is_completed: boolean,
  created_at: number,
  updated_at: number,
  deleted_at: number | null
}

interface ITaskGroup {
  id: number,
  title: string,
  tags: string[],
  created_at: number,
  updated_at: number,
  deleted_at: number | null,
  task_items: ITaskItem[]
}

interface IDailyTaskItem {
  id: number,             // FK to ITaskItem.id
  content: string,        // FK to ITaskItem.content
  is_completed: boolean,  // FK to ITaskItem.is_completed
  created_at: number,
  updated_at: number,
  deleted_at: number | null,
  task_group_id: number,  // FK to ITaskGroup.id
  task_group_title: string // FK to ITaskGroup.title
}

// export interface Data {
//   [user_id: number]: {
//     task_groups: ITaskGroup[],
//     daily_tasks: {
//       [date: number]: IDailyTaskItem[]
//     },
//     reflection_notes: {
//       [date: number]: string | null
//     }
//     tags: string[]
//   }
// }

interface IGetMultipleParams {
  tags?: string[];
  search?: string;
  is_completed?: boolean;
}

interface IGetAllTaskListParams extends IGetMultipleParams {
  isIncludeTaskItems?: boolean;
}

interface IGetDailyTasksParams extends IGetMultipleParams {
  date: number;
}

export interface ITaskService {
  // Task List Operations
  getAllTaskList: (userId: number, params: IGetAllTaskListParams) => Promise<ITaskGroup[]>;
  createTaskList: (userId: number, title: string) => Promise<ITaskGroup>;
  editTaskListTitle: (userId: number, taskGroupId: number, title: string) => Promise<ITaskGroup>;
  editTaskListTags: (userId: number, taskGroupId: number, tags: string[]) => Promise<ITaskGroup>;
  deleteTaskList: (userId: number, taskGroupId: number) => Promise<void>;

  // Task Item Operations
  createTaskItem: (userId: number, taskGroupId: number, content: string) => Promise<ITaskItem>;
  editTaskItemTitle: (userId: number, taskGroupId: number, taskItemId: number, content: string) => Promise<ITaskItem>;
  editTaskItemCompletion: (userId: number, taskGroupId: number, taskItemId: number, is_completed: boolean) => Promise<ITaskItem>;
  deleteTaskItem: (userId: number, taskGroupId: number, taskItemId: number) => Promise<void>;
  reorderTaskItems: (userId: number, taskGroupId: number, orderedTaskItemIds: number[]) => Promise<ITaskGroup>;

  // Daily Task Operations
  getDailyTasksByDate: (userId: number, params: IGetDailyTasksParams) => Promise<IDailyTaskItem[]>;
  addDailyTask: (userId: number, taskItemId: number, date: number) => Promise<IDailyTaskItem>;
  editDailyTaskCompletion: (userId: number, taskItemId: number, date: number, is_completed: boolean) => Promise<IDailyTaskItem>;
  editDailyTaskContent: (userId: number, taskItemId: number, date: number, content: string) => Promise<IDailyTaskItem>;
  deleteDailyTask: (userId: number, taskItemId: number, date: number) => Promise<void>;

  // Reflection Notes
  createDailyReflectionNote: (userId: number, date: number, content: string) => Promise<void>;
  getDailyReflectionNoteByDate: (userId: number, date: number) => Promise<string | null>;
}