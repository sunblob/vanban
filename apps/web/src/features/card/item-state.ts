import { type Ref } from 'vue';
import { CardsApi } from '@/utils/api/cards';
import { useQuery } from '@tanstack/vue-query';

export function useCard(id: Ref<string>) {
  return useQuery({
    queryKey: ['card', id],
    queryFn: () => CardsApi.getCard(id.value),
  });
}
