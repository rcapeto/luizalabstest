import { useQuery, UseQueryOptions } from 'react-query';
import { GetResponse, Hero, ComicAPIData } from '../@types/api';

import { getHeroes, getHero, getComicsByHero } from '../services/get';

export const useGetHeroes = (
   page?: number,
   sortByName?: boolean, 
   options?: UseQueryOptions<GetResponse<Hero[]>>
) => {
   return useQuery<GetResponse<Hero[]>>(['heroes', page, sortByName], async () => await getHeroes(page, sortByName), {
      ...options,
      staleTime: 1000 * 5 //5 seconds (não atualizar por 5 segundos),
   });
};

export const useGetHero = (heroId: number, options?: UseQueryOptions<GetResponse<Hero>>) => {
   return useQuery<GetResponse<Hero>>(['hero', heroId], async () => await getHero(heroId), {
      ...options,
      staleTime: 1000 * 5 //5 seconds (não atualizar por 5 segundos)
   });
};

export const useGetComics = (heroId: number) => {
   return useQuery<GetResponse<ComicAPIData[]>>(
      ['comics-heroId', heroId], 
      async () => await getComicsByHero(heroId)
   );
};