import { useReducer } from 'react';

import { HeroState, HeroActions } from '../@types/components';

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

         localStorage.setItem('favorited_heroes_marvel', JSON.stringify(favorites));

         return {
            ...state,
            favoritedHeroes: favorites,
         };
      case 'SET_FILTERED_HEROES':
         const heroes = actions.payload.heroes;
         const value = actions.payload.text.toLowerCase();
         const filteredHeroes = heroes.filter(hero => hero.name.toLowerCase().includes(value));
         
         return {
            ...state,
            filteredHeroes
         }
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