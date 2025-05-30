import { Suspense } from "react";
import Tasks from "../components/Tasks";
import TasksSkeleton from "@/components/Tasks/Skeleton";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen min-w-screen items-center justify-between">
      <main className="flex-1 w-full">
        <Suspense fallback={<TasksSkeleton />}>
          <Tasks />
        </Suspense>
      </main>
      <footer className="flex gap-[24px] flex-wrap items-center justify-center py-4">
        <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          Made with
          <span role="img" aria-label="love" className="text-red-500">❤️</span>
          by Rico DevLabs
        </span>
      </footer>
    </div>
  );
}
