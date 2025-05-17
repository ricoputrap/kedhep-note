import React from "react";
import TaskCardSkeleton from "../TaskCard/Skeleton";

export default function TasksSkeleton() {
  return (
    <div
      className="grid gap-6 p-6"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      }}
    >
      <TaskCardSkeleton />
      <TaskCardSkeleton />
      <TaskCardSkeleton />
      <TaskCardSkeleton />
      <TaskCardSkeleton />
      <TaskCardSkeleton />
      <TaskCardSkeleton />
      <TaskCardSkeleton />
      <TaskCardSkeleton />
      <TaskCardSkeleton />
      <TaskCardSkeleton />
      <TaskCardSkeleton />
    </div>
  );
}
