import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';
import { BoardsApi } from '@/utils/api/boards';

export const useBoardActions = () => {
  const queryClient = useQueryClient();

  const { mutate: createBoard } = useMutation({
    mutationFn: ({
      title,
      image,
      previewImage,
    }: {
      title: string;
      image: string;
      previewImage: string;
    }) => BoardsApi.createBoard({ title, image, previewImage }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['boards'] });
      await queryClient.invalidateQueries({ queryKey: ['board'] });
    },
    onError: () => {
      toast.error('Failed to create new board');
    },
  });

  const { mutate: updateBoard } = useMutation({
    mutationFn: ({ id, title, isClosed }: { id: string; title?: string; isClosed?: boolean }) =>
      BoardsApi.updateBoard(id, { title, isClosed }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['boards'] });
      await queryClient.invalidateQueries({ queryKey: ['board'] });
    },
    onError: () => {
      toast.error('Failed to update board');
    },
  });

  const { mutate: deleteBoard } = useMutation({
    mutationFn: (id: string) => BoardsApi.deleteBoard(id),
    onSuccess: async () => {
      console.log('deleteBoard success');

      await queryClient.invalidateQueries({ queryKey: ['boards'] });
      await queryClient.invalidateQueries({ queryKey: ['board'] });
    },
    onError: () => {
      toast.error('Failed to delete board');
    },
  });

  return {
    createBoard,
    updateBoard,
    deleteBoard,
  };
};
