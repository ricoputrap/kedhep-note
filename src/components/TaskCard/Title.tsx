"use client";

import React, { useState } from 'react'

interface TitleProps {
  initialTitle: string;
}

export default function Title({ initialTitle }: TitleProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initialTitle);

  return (
    <div>
      {editing ? (
        <input
          className="border rounded px-1 text-lg font-semibold w-full"
          value={value}
          autoFocus
          onBlur={() => setEditing(false)}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') setEditing(false); }}
        />
      ) : (
        <span
          className="text-lg font-semibold cursor-text"
          onClick={() => setEditing(true)}
        >
          {value}
        </span>
      )}
    </div>
  )
}
