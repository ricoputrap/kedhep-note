"use client";

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TitleProps {
  initialTitle: string;
}

export default function Title({ initialTitle }: TitleProps) {
  const [value, setValue] = useState(initialTitle);

  return (
    <div>
      <Label className="w-full">
        <Input
          className="text-lg font-semibold w-full bg-transparent border-none focus:border-none focus:ring-0 outline-none shadow-none"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </Label>
    </div>
  )
}
