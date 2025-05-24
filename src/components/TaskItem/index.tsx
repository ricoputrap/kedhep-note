"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { AutosizeTextarea } from "@/components/ui/autosized-textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TaskItemProps {
  name: string;
  isSelectModeActive?: boolean;
  isSelected?: boolean;
}

export default function TaskItem({ name, isSelectModeActive, isSelected }: TaskItemProps) {
  const [value, setValue] = useState(name);

  return (
    <li className={cn({
      "flex gap-3 min-h-[32px] px-2 py-1 rounded-xl shadow-none group": true,
      "bg-gray-50": isSelected,
    })}>
      <span className="h-8 flex items-center">
        <Checkbox className="cursor-pointer flex-shrink-0 w-5 h-5 border-2 border-gray-400 bg-white" disabled={isSelectModeActive} />
      </span>
      <Label className="w-full">
        <AutosizeTextarea
          minHeight={12}
          className={cn(
            "text-base font-normal w-full px-0 pb-0 pt-1 rounded-md border-none outline-none shadow-none bg-transparent resize-none h-fit text-gray-900",
            "focus-visible:ring-transparent overflow-hidden",
          )}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={isSelectModeActive}
        />
      </Label>
      <span className={cn({
        "h-8 flex items-center opacity-0 group-hover:opacity-60 hover:opacity-100": true,
        "opacity-0 group-hover:opacity-0 hover:opacity-0": isSelectModeActive,
      })}>
        <Button
          variant="ghost"
          size="sm"
          className={cn({
            "rounded-full h-7 w-7 p-0 opacity-0 group-hover:opacity-60 hover:opacity-100 transition-opacity cursor-pointer": true,
            "cursor-default": isSelectModeActive,
          })}
          aria-label="Delete task"
          onClick={(e) => {
            e.stopPropagation();
            // Handle delete action here
            alert(`Delete task: ${value}`);
          }}
          disabled={isSelectModeActive}
        >
          <X />
        </Button>
      </span>
    </li>
  );
}
