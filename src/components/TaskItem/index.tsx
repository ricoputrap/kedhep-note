"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { AutosizeTextarea } from "@/components/ui/autosized-textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  name: string;
}

export default function TaskItem({ name }: TaskItemProps) {
  const [value, setValue] = useState(name);

  return (
    <li className="flex items-start space-x-2 min-h-[32px] mb-0">
      <span className="h-7 flex items-center">
        <Checkbox className="cursor-pointer mt-1" />
      </span>
      <Label className="w-full">
        <AutosizeTextarea
          minHeight={16}
          className={cn(
            "text-sm w-full px-2 py-1 rounded-md border-none outline-none shadow-none bg-white",
            "focus-visible:ring-transparent resize-none h-fit"
          )}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Label>
    </li>
  );
}
