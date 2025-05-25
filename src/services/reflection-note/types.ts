export interface IReflectionNote {
  id: number,
  content: string,
  date: number, // Unix timestamp
  user_id: number, // FK to IUser.id
  created_at: number,
  updated_at: number,
  deleted_at: number | null,
}

export interface IReflectionNoteService {
  createReflectionNote: (userId: number, date: number, content: string) => Promise<IReflectionNote>;
  getReflectionNoteByDate: (userId: number, date: number) => Promise<IReflectionNote | null>;
  editReflectionNoteContent: (id: number, content: string) => Promise<IReflectionNote>;
  deleteReflectionNote: (id: number) => Promise<void>;
}