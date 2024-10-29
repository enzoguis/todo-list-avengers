import { z } from 'zod'

export const todosSchema = z.object({
  id: z.string(),
  text: z.string().min(1, { message: 'O campo deve ter mais que 1 letra' }),
  completed: z.boolean(),
})

export type Todos = z.infer<typeof todosSchema>
