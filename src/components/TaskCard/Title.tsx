"use client";

import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import { AutosizeTextarea } from '../ui/autosized-textarea';

interface TitleProps {
  initialTitle: string;
}

export default function Title({ initialTitle }: TitleProps) {
  const [value, setValue] = useState(initialTitle);

  return (
    <div>
      <Label className="w-full">
        <AutosizeTextarea
          minHeight={12}
          className="p-1 resize-none h-fit !text-lg font-semibold w-full bg-transparent border-none focus-visible:ring-transparent focus:ring-0 outline-none shadow-none"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </Label>
    </div>
  )
}
