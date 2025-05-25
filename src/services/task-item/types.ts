
export interface ITaskItem {
  id: number,
  content: string,
  is_completed: boolean,
  position: number, // Position in the task group
  task_group_id: number, // FK to ITaskGroup.id
  user_id: number, // FK to User.id
  created_at: number,
  updated_at: number,
  deleted_at: number | null
}

export interface ITaskItemService {
  createTaskItem: (userId: number, taskGroupId: number, content: string) => Promise<ITaskItem>;
  editTaskItemTitle: (id: number, content: string) => Promise<ITaskItem>;
  editTaskItemCompletion: (id: number, is_completed: boolean) => Promise<ITaskItem>;
  deleteTaskItem: (id: number) => Promise<void>;
  reorderTaskItem: (id: number, taskGroupId: number, newPosition: number) => Promise<ITaskItem>;
}