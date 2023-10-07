export interface TodoObject {
  id: number
  title: string
  description: string
  is_complete: boolean
  created_at: string
  updated_at: string
}

export interface CreateToDoObject {
  title: string
  description: string
}

export interface UpdateToDoObject {
  id: number
  title: string
  description: string
}