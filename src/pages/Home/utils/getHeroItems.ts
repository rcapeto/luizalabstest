import { Hero, GetResponse } from "../../../@types/api";
import { returnHeroesArray } from './returnHeroesArray';

export const getHeroItems = (
   responseHeroAPI: GetResponse<Hero[]> | undefined,
   responseHeroAPIWithText: GetResponse<Hero[]> | undefined,
   hasTextInSearchbar: boolean,
   favoritedHeroes: Hero[],
   buttonFavoriteHeroesIsActive: boolean,
): Hero[] => {
   return buttonFavoriteHeroesIsActive ? 
      favoritedHeroes : !hasTextInSearchbar ? 
         returnHeroesArray(responseHeroAPI) : returnHeroesArray(responseHeroAPIWithText)
   ;
};