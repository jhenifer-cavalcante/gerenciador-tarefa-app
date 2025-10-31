import React, { useState } from 'react'
import { TaskItem } from '../components/TaskItem'
import type { Task } from '../components/TaskItem'
import { TaskForm } from '../components/TaskForm'

export const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    }
    setTasks((prev) => [...prev, newTask])
  }

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    )
  }

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-gray-50 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">Gerenciador de Tarefas</h1>
      <TaskForm onAdd={addTask} />
      <div>
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">Nenhuma tarefa adicionada ainda.</p>
        ) : (
          tasks.map((task) => (
            <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
          ))
        )}
      </div>
    </div>
  )
}
