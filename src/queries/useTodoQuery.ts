import { useQuery } from '@tanstack/react-query'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { Todos, todosSchema } from '../models/todosSchema'

export function useTodoQuery() {
  return useQuery({
    queryKey: ['getTodos'],
    queryFn: async () => {
      const todosRef = collection(db, 'todos').withConverter({
        toFirestore: (todo: Todos) => todo,
        fromFirestore: (snapshot) => {
          const data = todosSchema.parse({
            id: snapshot.id,
            ...snapshot.data(),
          })
          const parse = todosSchema.safeParse(data)
          return parse.data
        },
      })

      const snapshot = await getDocs(todosRef)
      return snapshot.docs.map((doc) => doc.data())
    },
  })
}
