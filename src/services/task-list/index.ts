import { ITaskListService } from "./types";
import getAllTaskList from "./get-all-task-list";
import createTaskList from "./create-task-list";
import editTaskListTitle from "./edit-task-list-title";
import editTaskListTags from "./edit-task-list-tags";
import deleteTaskList from "./delete-task-list";

/**
 * Service for managing task lists, including CRUD operations and tag management.
 * @implements {ITaskListService}
 */
const taskListService: ITaskListService = {
  /**
   * Get all task lists for a user, with optional filtering and inclusion of task items.
   */
  getAllTaskList,
  /**
   * Create a new task list for a user.
   */
  createTaskList,
  /**
   * Edit the title of a task list.
   */
  editTaskListTitle,
  /**
   * Edit the tags of a task list.
   */
  editTaskListTags,
  /**
   * Soft delete a task list by setting its deleted_at timestamp.
   */
  deleteTaskList,
};

export default taskListService;