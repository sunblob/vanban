import { BoardsApi } from '@/utils/api/boards';
import { useQuery } from '@tanstack/vue-query';

export const useBoards = () => {
  return useQuery({
    queryFn: () => BoardsApi.getBoards(),
    queryKey: ['boards'],
    initialData: [],
  });
};
