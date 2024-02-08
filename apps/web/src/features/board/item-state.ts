import { toValue, type Ref } from 'vue';
import { BoardsApi } from '@/utils/api/boards';
import { useQuery } from '@tanstack/vue-query';

export const useBoard = (id: Ref<string>) => {
  return useQuery({
    queryFn: () => BoardsApi.getBoard(toValue(id)),
    queryKey: ['board'],
  });
};
