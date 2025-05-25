import { dbTaskItem, dbTaskList } from "@/db";
import { ITaskList, ITaskListService } from "./types";

const taskListService: ITaskListService = {
  async getAllTaskList(userId, params) {
    let lists = dbTaskList.filter(list => list.deleted_at === null && list.user_id === userId);

    // Filter by tags
    if (params?.tags && params.tags.length > 0) {
      lists = lists.filter(list => params.tags!.every(tag => list.tags.includes(tag)));
    }

    // Filter by search (title)
    if (params?.search) {
      lists = lists.filter(list => list.title.toLowerCase().includes(params.search!.toLowerCase()));
    }

    // Include task items if requested
    if (params?.isIncludeTaskItems) {
      lists = lists.map(list => ({
        ...list,
        task_items: dbTaskItem
          .filter(item => item.task_group_id === list.id && item.deleted_at === null)
          .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
      }));
    }

    return lists;
  },

  async createTaskList(userId, title) {
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

    // Return the newly created list
    return newList;
  },

  async editTaskListTitle(userId, taskGroupId, title) {
    const index = dbTaskList.findIndex(listItem => {
      return listItem.id === taskGroupId &&
         listItem.deleted_at === null &&
         listItem.user_id === userId;
    });
    if (index === -1) throw new Error("Task list not found");

    dbTaskList[index] = {
      ...dbTaskList[index],
      title,
      updated_at: Date.now(),
    };

    // Return the updated list
    const list = dbTaskList[index];
    return list;
  },

  async editTaskListTags(userId, taskGroupId, tags) {
    const index = dbTaskList.findIndex(listItem => {
      return listItem.id === taskGroupId &&
         listItem.deleted_at === null &&
         listItem.user_id === userId;
    });
    if (index === -1) throw new Error("Task list not found");

    dbTaskList[index] = {
      ...dbTaskList[index],
      tags,
      updated_at: Date.now(),
    };

    // Return the updated list
    const list = dbTaskList[index];
    return list;
  },

  async deleteTaskList(userId, taskGroupId) {
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
}

export default taskListService;