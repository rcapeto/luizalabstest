import { useReducer } from 'react';

import { HeroState, HeroActions } from '../@types/components';
import { variables } from '../config/variables';

const initialHeroState: HeroState = {
   favoritedHeroes: [],
   filteredHeroes: [],
   activeFavoriteButton: false,
   activeOrderByButton: false,
};

const dispatch = (state: HeroState, actions: HeroActions) => {
   const favorites = [...state.favoritedHeroes];

   switch(actions.type) {
      case 'HANDLE_FAVORITE_HERO':
         const hero = actions.payload.hero;
         const currentHeroId = hero.id;
         const heroIndex = favorites.findIndex(hero => hero.id === currentHeroId);
         heroIndex >= 0 ? favorites.splice(heroIndex, 1) : favorites.push(hero);

         localStorage.setItem(variables.localstorage.favorited, JSON.stringify(favorites));

         return {
            ...state,
            favoritedHeroes: favorites,
         };
      case 'TOGGLE_FAVORITE_BUTTON':
         return {
            ...state,
            activeFavoriteButton: !state.activeFavoriteButton  
         }
      case 'TOGGLE_ORDER_BY_BUTTON':
         return {
            ...state,
            activeOrderByButton: !state.activeOrderByButton
         }
      case 'SET_FAVORITES_HEROES':
         return {
            ...state,
            favoritedHeroes: actions.payload.favoritedHeroes
         }
      default:
         return state;
   }
};

export const useHeroReducer = () => useReducer(dispatch, initialHeroState);