import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TaskCardSkeleton() {
  return (
    <Card className="gap-0 py-3 shadow-none">
      <CardHeader className="px-4">
        <CardTitle>
          <Skeleton className="h-7 w-32 mb-2" />
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <ul className="space-y-2">
          {[...Array(4)].map((_, idx) => (
            <li key={idx} className="flex items-start space-x-2 min-h-[32px] mb-0">
              <span className="h-7 flex items-center">
                <Skeleton className="h-5 w-5 rounded" />
              </span>
              <Skeleton className="h-6 w-full max-w-[180px]" />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
