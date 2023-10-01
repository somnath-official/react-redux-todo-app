export interface TodoObject {
  id: number,
  title: string,
  description: string,
  is_complete: boolean,
  is_deleted: boolean,
  created_at: string,
  updated_at: string,
  deleted_at?: string,
}

export interface CreateToDoObject {
  title: string,
  description: string,
}