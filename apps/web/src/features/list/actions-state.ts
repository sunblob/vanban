import { ListsApi } from '@/utils/api/lists';
import { useMutation, useQueryClient } from '@tanstack/vue-query';

export const useListActions = () => {
  const queryClient = useQueryClient();

  const { mutate: createList } = useMutation({
    mutationFn: ({
      title,
      position,
      boardId,
    }: {
      title: string;
      position: number;
      boardId: string;
    }) => ListsApi.createList({ title, position, boardId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['board'] });
    },
  });

  const { mutate: updateList } = useMutation({
    mutationFn: ({
      id,
      title,
      description,
      position,
    }: {
      id: string;
      title?: string;
      description?: string;
      position?: number;
    }) => ListsApi.updateList(id, { title, description, position }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['board'] });
    },
  });

  const { mutate: deleteList } = useMutation({
    mutationFn: (id: string) => ListsApi.deleteList(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['board'] });
    },
  });

  const { mutate: copyList } = useMutation({
    mutationFn: (id: string) => ListsApi.copyList(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['board'] });
    },
  });

  const { mutate: reorderList } = useMutation({
    mutationFn: ({
      id,
      newPosition,
      boardId,
    }: {
      id: string;
      newPosition: number;
      boardId: string;
    }) => ListsApi.reorderList(id, { newPosition, boardId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['board'] });
    },
  });

  return {
    createList,
    updateList,
    deleteList,
    copyList,
    reorderList,
  };
};
