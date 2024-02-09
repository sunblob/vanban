import { CardsApi } from '@/utils/api/cards';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';

export const useCardActions = () => {
  const queryClient = useQueryClient();

  const { mutate: createCard } = useMutation({
    mutationFn: ({
      title,
      position,
      listId,
    }: {
      title: string;
      position: number;
      listId: string;
    }) => CardsApi.createCard({ title, position, listId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['board'] });
    },
  });

  const { mutate: updateCard } = useMutation({
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
    }) => CardsApi.updateCard(id, { title, description, position }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['board'] });
    },
  });

  const { mutate: deleteCard } = useMutation({
    mutationFn: (id: string) => CardsApi.deleteCard(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['board'] });
    },
  });

  const { mutate: copyCard } = useMutation({
    mutationFn: (id: string) => CardsApi.copyCard(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['board'] });
    },
  });

  const { mutate: reorderCard } = useMutation({
    mutationFn: ({
      cardId,
      newPosition,
      listId,
      newListId,
    }: {
      cardId: string;
      newPosition: number;
      listId: string;
      newListId?: string;
    }) => CardsApi.reorderCard(cardId, { newPosition, listId, newListId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['board'] });
      toast.success('Card moved');
    },
  });

  return {
    createCard,
    updateCard,
    deleteCard,
    copyCard,
    reorderCard,
  };
};
