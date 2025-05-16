"use client";

import React, { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"

interface TaskItemProps {
  name: string;
}

export default function TaskItem({ name }: TaskItemProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(name);

  return (
    <li className="flex items-start space-x-2">
      <Checkbox className="cursor-pointer mt-1" />
      {editing ? (
        <input
          className="border rounded px-1 py-0.5 text-sm w-full"
          value={value}
          autoFocus
          onBlur={() => setEditing(false)}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') setEditing(false); }}
        />
      ) : (
        <span
          className="break-words leading-normal cursor-text"
          onClick={() => setEditing(true)}
        >
          {value}
        </span>
      )}
    </li>
  )
}
