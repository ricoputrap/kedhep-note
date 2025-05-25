import { ITaskItemService } from "./types";
import createTaskItem from "./create-task-item";
import editTaskItemTitle from "./edit-task-item-title";
import editTaskItemCompletion from "./edit-task-item-completion";
import deleteTaskItem from "./delete-task-item";
import reorderTaskItem from "./reorder-task-item";

const taskItemService: ITaskItemService = {
  createTaskItem,
  editTaskItemTitle,
  editTaskItemCompletion,
  deleteTaskItem,
  reorderTaskItem,
};

export default taskItemService;