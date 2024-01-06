import type { Board, ID } from '@/types';
import { defineStore } from 'pinia';

export const useBoardStore = defineStore('board', {
  state: (): Board => ({
    id: '123',
    title: 'Board test#1',
    columns: [
      {
        id: '34543543',
        title: 'To Do',
        tasks: [
          {
            id: '34352',
            title: 'Create a new Vue Project',
            tags: [],
          },
          {
            id: '413123',
            title: 'Start working on a vanban',
            tags: [],
          },
        ],
      },
      {
        id: '5353',
        title: 'In progress',
        tasks: [],
      },
      {
        id: '4388835',
        title: 'QA',
        tasks: [],
      },
      {
        id: '5543252',
        title: 'Completed',
        tasks: [],
      },
    ],
  }),
  actions: {
    getColumnById(id: ID) {
      return this.columns.find((c) => c.id === id);
    },

    getTaskById(columnId: ID, id: ID) {
      const col = this.getColumnById(columnId);

      if (col) {
        return col.tasks.find((t) => t.id === id);
      }
    },

    updateColumn({ id, title }: { id: ID; title: string }) {
      const col = this.getColumnById(id);

      if (col) {
        col.title = title;
      }
    },

    createTask({ columnId, title }: { columnId: ID; title: string }) {
      const col = this.getColumnById(columnId);

      if (col) {
        col.tasks.push({ id: `${Date.now()}`, title, tags: [] });
      }
    },

    updateTask({ columnId, taskTitle, taskId }: { columnId: ID; taskTitle: string; taskId: ID }) {
      const task = this.getTaskById(columnId, taskId);

      if (task) {
        task.title = taskTitle;
      }
    },
  },
});
