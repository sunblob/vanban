export interface Workspace {
  id: string;
  title: string;
  boards: Board[];
}

export interface Board {
  id: string;
  title: string;
  fullImage?: String;
  previewImage?: String;
  authorId: string;
  isClosed?: false;
  lists: List[];
}

export interface Activity {
  id: string;
  author: string;
}

export interface List {
  id: string;
  title: string;
  position: number;
  boardId: string;
  cards: Card[];
}

export interface Card {
  id: string;
  title: string;
  description?: string;
  position: number;
  tags?: Tag[];
  authorId: string;
  listId: string;
}

type Tag = 'TASK' | 'BUG' | 'OTHER';

export type ID = string | number;
