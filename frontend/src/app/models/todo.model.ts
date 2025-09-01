export interface Todo {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TodoStats {
  totalCount: number;
  completedCount: number;
  pendingCount: number;
}
