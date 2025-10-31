import React from 'react'

export interface Task {
  id: number
  title: string
  completed: boolean
}

interface TaskItemProps {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div className="flex justify-between items-center bg-white shadow-sm rounded-lg p-3 mb-2">
      <div
        className={`flex items-center gap-2 cursor-pointer ${
          task.completed ? 'line-through text-gray-400' : ''
        }`}
        onClick={() => onToggle(task.id)}
      >
        <input type="checkbox" checked={task.completed} readOnly />
        <span>{task.title}</span>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700 font-semibold"
      >
        ✕
      </button>
    </div>
  )
}
