import { api } from './api';
import { APIResponse, GetResponse, Hero, ComicAPIData } from '../@types/api';

export const getHeroes = async (page?: number, sortByName?: boolean): Promise<GetResponse<Hero[]>> => {
   const { data: response } = await api.get<APIResponse<Hero>>('characters', { 
      params: {
         orderBy: sortByName ? 'name' : '-modified',
         limit: 20,
         offset: (page ?? 1) * 20,
      }
   });
   return { data: response.data.results ?? [], total: response.data.total };
}; 

export const getHeroesWithText = async (text: string): Promise<GetResponse<Hero[]>> => {
   if(!text.trim().length) {
      return {
         data: [],
         total: 0
      }
   };

   const { data: response } = await api.get<APIResponse<Hero>>('characters', { 
      params: {
         limit: 10,
         nameStartsWith: text,
      }
   });
   return { data: response.data.results ?? [], total: response.data.total };
}; 

export const getHero = async (heroId: number): Promise<GetResponse<Hero>> => {
   const { data: response } = await api.get<APIResponse<Hero>>(`characters/${heroId}`);
   const data = response.data.results?.[0] ?? null;
   return { data };
}; 

export const getComicsByHero = async (heroId: number): Promise<GetResponse<ComicAPIData[]>> => {
   const { data: response } = await api.get<APIResponse<ComicAPIData>>('comics', { 
      params: {
         orderBy: 'onsaleDate',
         limit: 10,
         characters: heroId,
      }
   });
   return { data: response.data.results ?? [] };
}; 
