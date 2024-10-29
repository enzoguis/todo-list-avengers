import { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  onSnapshot,
  deleteDoc,
} from 'firebase/firestore'
import { db } from './firebase'
import { Todos } from './models/todosSchema'

function TodoList() {
  const [todo, setTodo] = useState<Todos[]>([])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>(
    'all'
  )

  useEffect(() => {
    const todoRef = collection(db, 'todos')

    const unsubscribe = onSnapshot(todoRef, (snapshot) => {
      const todosList: Todos[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Todos[]
      setTodo(todosList)
    })

    return () => unsubscribe()
  }, [])

  const addTodo = async () => {
    if (input.trim()) {
      const todoRef = collection(db, 'todos')
      const newTodo = { text: input, completed: false }
      await addDoc(todoRef, newTodo)
      setInput('')
    } else {
      alert('O campo não pode ser vazio!')
    }
  }

  const onChangeCheckBox = async (id: string, completed: boolean) => {
    const todoRef = doc(db, 'todos', id)
    await updateDoc(todoRef, { completed: !completed })
  }

  const deleteTodo = async (id: string) => {
    const todoRef = doc(db, 'todos', id)
    await deleteDoc(todoRef)
  }

  const filteredTodos = todo.filter((item) => {
    if (filter === 'completed') return item.completed
    if (filter === 'incomplete') return !item.completed
    return true // 'all'
  })

  return (
    <div className="bg-slate-200 w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col bg-white p-10 rounded-lg gap-y-4">
        <div>
          <p>ToDo-List</p>
        </div>
        <div className="flex gap-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="add todo"
          />
          <button onClick={addTodo} className="bg-green-500 rounded-md p-2">
            Add Todo
          </button>
        </div>
        <div className="flex gap-x-2">
          <button
            onClick={() => setFilter('all')}
            className="p-2 bg-blue-500 text-white rounded-md"
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('completed')}
            className="p-2 bg-blue-500 text-white rounded-md"
          >
            Completas
          </button>
          <button
            onClick={() => setFilter('incomplete')}
            className="p-2 bg-blue-500 text-white rounded-md"
          >
            Pendentes
          </button>
        </div>
        <div>
          {filteredTodos.map((item) => (
            <div
              key={item.id}
              className="flex gap-x-5 justify-start items-center"
            >
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-x-3">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => onChangeCheckBox(item.id, item.completed)}
                  />
                  <h2
                    className={
                      item.completed ? 'line-through text-gray-700' : ''
                    }
                  >
                    {item.text}
                  </h2>
                </div>
                <button
                  onClick={() => deleteTodo(item.id)}
                  className="bg-red-500 rounded-md p-1 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TodoList
