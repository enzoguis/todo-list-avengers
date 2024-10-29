import { useState } from "react"
import { useTodoQuery } from "./queries/useTodoQuery"
import { Todos } from "./models/todosSchema"

export function TodoList(){

  const [todo, setTodo] = useState<Todos[]>([])
  const { data, isLoading, error } = useTodoQuery()

  return(

  )
}