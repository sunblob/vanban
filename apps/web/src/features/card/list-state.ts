import { CardsApi } from '@/utils/api/cards';
import { useQuery } from '@tanstack/vue-query';

export const useCards = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['lists'],
    queryFn: () => CardsApi.getCards(),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
