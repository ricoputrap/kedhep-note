import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

interface TaskCardProps {
  title: string;
  tasks: string[];
}

export default function TaskCard({ title, tasks }: TaskCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Task List</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {tasks.map((task, idx) => (
            <li key={idx} className="flex items-start space-x-2">
              <Checkbox className="cursor-pointer mt-1" />
              <span className="break-words leading-normal">{task}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
