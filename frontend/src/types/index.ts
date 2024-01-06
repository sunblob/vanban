export interface Workspace {
  id: ID;
  title: string;
  boards: Board[];
}

export interface Board {
  id: ID;
  title: string;
  columns: Column[];
  isClosed?: false;
}

export interface Activity {
  id: ID;
  author: string;
}

export interface Column {
  id: ID;
  title: string;
  tasks: Task[];
}

export interface Task {
  id: ID;
  title: string;
  tags?: Tag[];
  endsAt?: Date;
  participants?: string[];
}

type Tag = 'story' | 'task' | 'bug';

export type ID = string | number;
