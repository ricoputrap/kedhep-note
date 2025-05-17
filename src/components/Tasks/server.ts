"use server";

import { TASKS_GROUPS } from "./constants";

export const getTasks = async () => {
  console.log("Fetching tasks...");
  // Simulate a delay to mimic an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Tasks fetched successfully");
      return resolve(TASKS_GROUPS);
    }, 3000);
  }
  );
}