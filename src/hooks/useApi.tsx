import { useQuery, UseQueryOptions } from 'react-query';

import { GetResponse, Hero, ComicAPIData } from '../@types/api';
import { variables } from '../config/variables';

import { getHeroes, getHero, getComicsByHero, getHeroesWithText } from '../services/get';

const five_seconds = 1000 * 5;

export const useGetHeroes = (
   page?: number,
   sortByName?: boolean, 
   options?: UseQueryOptions<GetResponse<Hero[]>>
) => {
   return useQuery<GetResponse<Hero[]>>(
      [variables.react_query.get_heroes, page, sortByName], 
      async () => await getHeroes(page, sortByName), 
      { ...options, staleTime: five_seconds }
   );
};

export const useGetHero = (heroId: number, options?: UseQueryOptions<GetResponse<Hero>>) => {
   return useQuery<GetResponse<Hero>>(
      [variables.react_query.get_hero, heroId], 
      async () => await getHero(heroId), 
      { ...options, staleTime: five_seconds }
   );
};

export const useGetComics = (heroId: number) => {
   return useQuery<GetResponse<ComicAPIData[]>>(
      [variables.react_query.get_comics, heroId], 
      async () => await getComicsByHero(heroId),
      {
         staleTime: five_seconds,
      }
   );
};

export const useGetHeroesWithText = (text: string) => {
   return useQuery<GetResponse<Hero[]>>(
      [variables.react_query.get_heroes_with_text, text], 
      async () => await getHeroesWithText(text), 
      { staleTime: five_seconds }
   );
};