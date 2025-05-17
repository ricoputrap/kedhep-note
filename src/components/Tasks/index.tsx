import React from 'react'
import TaskCard from '../TaskCard'
import { getTasks } from './server'

export default async function Tasks() {
  // Define the expected type for the tasks data
  type TaskGroup = {
    title: string;
    tasks: string[]; // Replace 'any' with the actual task type if known
  };
  
  const data = await getTasks() as TaskGroup[];

	return (
    <div
      className="grid gap-6 p-6"
      style={{
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      }}
    >
      {data.map((group, idx) => (
      <TaskCard key={idx} title={group.title} tasks={group.tasks} />
      ))}
    </div>
	)
}
