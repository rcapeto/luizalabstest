import { GetResponse, Hero } from '../../../@types/api';

export const returnHeroesArray = (response: GetResponse<Hero[]> | undefined) => {
   return (response && response.data && Array.isArray(response.data) && response.data) || [];
}; 