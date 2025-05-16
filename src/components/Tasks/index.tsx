import React from 'react'
import TaskCard from '../TaskCard'

const taskGroups = [
  {
    title: 'Work',
    tasks: [
      'Prepare quarterly financial report',
      'Email client',
      'Update project documentation',
      'Fix login bug',
      'Review pull requests',
      'Sync with design team',
    ],
  },
  {
    title: 'Personal',
    tasks: [
      'Buy groceries',
      'Read a book',
      'Call mom',
      'Organize closet',
      'Plan weekend trip to the mountains',
      'Renew gym membership',
    ],
  },
  {
    title: 'Learning',
    tasks: [
      'Complete React course on Udemy',
      'Read TypeScript handbook',
      'Practice coding challenges',
      'Watch AI conference keynote',
      'Write a blog post about hooks',
      'Review JavaScript ES2021 features',
    ],
  },
  {
    title: 'Fitness',
    tasks: [
      'Morning run',
      'Yoga session',
      'Track calories',
      'Join cycling group ride',
      'Stretch for 10 minutes',
      'Research new workout plans',
    ],
  },
  {
    title: 'Errands',
    tasks: [
      'Pick up laundry',
      'Mail package',
      'Book dentist appointment',
      'Pay electricity bill',
      'Refill prescription at pharmacy',
      'Drop off recycling',
    ],
  },
  {
    title: 'Travel',
    tasks: [
      'Book flight tickets',
      'Renew passport',
      'Pack suitcase',
      'Check weather forecast',
      'Create itinerary for Paris trip',
      'Arrange airport transfer',
    ],
  },
  {
    title: 'Shopping',
    tasks: [
      'Order new headphones',
      'Buy birthday gift for Sarah',
      'Compare laptop prices',
      'Add milk to shopping list',
      'Research best running shoes',
      'Check out online sales',
    ],
  },
  {
    title: 'Chores',
    tasks: [
      'Vacuum living room',
      'Water plants',
      'Clean kitchen counters',
      'Take out trash',
      'Organize bookshelf',
      'Fix leaky faucet in bathroom',
    ],
  },
]

export default function Tasks() {
	return (
    <div
      className="grid gap-6 p-6"
      style={{
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      }}
    >
      {taskGroups.map((group, idx) => (
      <TaskCard key={idx} title={group.title} tasks={group.tasks} />
      ))}
    </div>
	)
}
