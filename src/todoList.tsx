import { useEffect, useState } from 'react'
import { useTodoQuery } from './queries/useTodoQuery'
import { Todos } from './models/todosSchema'

export function TodoList() {
  const [todo, setTodo] = useState<Todos[]>([])
  const { data, isLoading, error } = useTodoQuery()

  useEffect(() => {
    if (data) {
      setTodo(data as Todos[])
    }
  }, [data])

  return (
    <div>
      {todo.map((item, index) => {
        return <div key={index}>{item.text}</div>
      })}
    </div>
  )
}
