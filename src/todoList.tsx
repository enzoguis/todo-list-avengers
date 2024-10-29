import { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore'
import { db } from './firebase'
import { Todos } from './models/todosSchema'

function TodoList() {
  const [todo, setTodo] = useState<Todos[]>([])
  const [input, setInput] = useState('')

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
        <div>
          {todo.map((item) => (
            <div
              key={item.id}
              className="flex gap-x-5 justify-start items-center"
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => onChangeCheckBox(item.id, item.completed)}
              />
              <div className="flex items-center">
                <h2
                  className={item.completed ? 'line-through text-gray-700' : ''}
                >
                  {item.text}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TodoList
