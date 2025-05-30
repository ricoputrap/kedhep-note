import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import TaskItem from "@/components/TaskItem"
import Title from "@/components/TaskCard/Title"

interface TaskCardProps {
  title: string;
  tasks: string[];
}

export default function TaskCard({ title, tasks }: TaskCardProps) {
  return (
    <Card className="gap-0 py-3 shadow-none">
      <CardHeader className="px-4">
        <CardTitle>
          <Title initialTitle={title} />
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <ul className="space-y-2">
          {tasks.map((task, idx) => (
            <TaskItem key={idx} name={task}  />
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
