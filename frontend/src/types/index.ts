export interface Workspace {
  id: ID;
  title: string;
  boards: Board[];
}

export interface Board {
  id: ID;
  title: string;
  fullImage?: String;
  previewImage?: String;
  authorId: string;
  isClosed?: false;
  lists: List[];
}

export interface Activity {
  id: ID;
  author: string;
}

export interface List {
  id: ID;
  title: string;
  position: number;
  boardId: ID;
  tasks: Card[];
}

export interface Card {
  id: ID;
  title: string;
  description?: string;
  position: number;
  tags?: Tag[];
  authorId: ID;
  listId: ID;
}

type Tag = 'TASK' | 'BUG' | 'OTHER';

export type ID = string | number;
