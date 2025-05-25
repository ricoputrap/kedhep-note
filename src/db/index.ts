import { IDailyTaskItem } from "@/services/daily-task/types";
import { IReflectionNote } from "@/services/reflection-note/types";
import { ITaskItem } from "@/services/task-item/types";
import { ITaskList } from "@/services/task-list/types";

export const dbTaskList: ITaskList[] = [
  {
    id: 1,
    title: "Work Projects",
    tags: ["work", "priority"],
    user_id: 101,
    created_at: 1716600000000,
    updated_at: 1716600000000,
    deleted_at: null
  },
  {
    id: 2,
    title: "Personal Errands",
    tags: ["personal"],
    user_id: 101,
    created_at: 1716601000000,
    updated_at: 1716601000000,
    deleted_at: null
  },
  {
    id: 3,
    title: "Groceries",
    tags: ["shopping"],
    user_id: 102,
    created_at: 1716602000000,
    updated_at: 1716602000000,
    deleted_at: null
  }
];

export const dbTaskItem: ITaskItem[] = [
  {
    id: 1,
    content: "Finish project proposal",
    is_completed: false,
    position: 1,
    task_group_id: 1,
    user_id: 101,
    created_at: 1716600100000,
    updated_at: 1716600100000,
    deleted_at: null
  },
  {
    id: 2,
    content: "Email client feedback",
    is_completed: true,
    position: 2,
    task_group_id: 1,
    user_id: 101,
    created_at: 1716600200000,
    updated_at: 1716600300000,
    deleted_at: null
  },
  {
    id: 3,
    content: "Pick up laundry",
    is_completed: false,
    position: 1,
    task_group_id: 2,
    user_id: 101,
    created_at: 1716601100000,
    updated_at: 1716601100000,
    deleted_at: null
  },
  {
    id: 4,
    content: "Buy milk",
    is_completed: false,
    position: 1,
    task_group_id: 3,
    user_id: 102,
    created_at: 1716602100000,
    updated_at: 1716602100000,
    deleted_at: null
  }
];

export const dbDailyTaskItem: IDailyTaskItem[] = [
  {
    id: 1, // FK to ITaskItem.id
    is_completed: false,
    created_at: 1716605000000,
    updated_at: 1716605000000,
    deleted_at: null
  },
  {
    id: 2, // FK to ITaskItem.id
    is_completed: true,
    created_at: 1716606000000,
    updated_at: 1716606000000,
    deleted_at: null
  }
];

export const dbReflectionNote: IReflectionNote[] = [];