import { z } from 'zod'

export const todosSchema = z.object({
  id: z.string(),
  text: z.string(),
  completed: z.boolean(),
})

export type Todos = z.infer<typeof todosSchema>
