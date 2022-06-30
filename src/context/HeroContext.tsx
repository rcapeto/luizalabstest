import { createContext, useContext, FunctionComponent, useEffect } from 'react';

import { HeroContextProviderProps, HeroContextValues } from '../@types/components';
import { Hero } from '../@types/api';
import { useHeroReducer } from '../reducer/HeroReducer';

const HeroContext = createContext({} as HeroContextValues);

export const HeroContextProvider: FunctionComponent<HeroContextProviderProps> = ({ children }) => {
   const [heroState, heroDispatch] = useHeroReducer();
   
   const handleFavoriteHero = (hero: Hero) => {
      const quantityInFavoriteArray = heroState.favoritedHeroes.length;
      const hasHero = heroState.favoritedHeroes.find(
         item => item.id === hero.id
      );
      let hasChangeState: boolean = false;

      if(quantityInFavoriteArray < 5) {
         heroDispatch({ type: 'HANDLE_FAVORITE_HERO', payload: { hero }});
         hasChangeState = true;

      } else {
         if(hasHero) {
            heroDispatch({ type: 'HANDLE_FAVORITE_HERO', payload: { hero }});
            hasChangeState = true;
         } else {
            alert('Sua lista já possui 5 heróis favoritados!');
         }
      }

      return hasChangeState;
   };

   const toggleFavoriteButton = () => {
      heroDispatch({ type: 'TOGGLE_FAVORITE_BUTTON' });
   };

   const toggleOrderByButton = () => {
      heroDispatch({ type: 'TOGGLE_ORDER_BY_BUTTON' });
   };

   const getFavoritesHeroes = (): Hero[] => {
      const herosStr = localStorage.getItem('favorited_heroes_marvel');
      return herosStr ? JSON.parse(herosStr) : [];
   };

   const hasHeroInFavorites = (heroId: number): boolean => {
      const hasFavorite = heroState.favoritedHeroes.find(hero => hero.id === heroId);
      return !!(hasFavorite);
   };

   useEffect(() => {
      const favorites = getFavoritesHeroes();
      heroDispatch({ type: 'SET_FAVORITES_HEROES', payload: { favoritedHeroes: favorites }});
   }, []);

   return(
      <HeroContext.Provider 
         value={{ 
            ...heroState, 
            handleFavoriteHero, 
            toggleFavoriteButton,
            toggleOrderByButton,
            hasHeroInFavorites
         }}
      >
         { children }
      </HeroContext.Provider>
   );
};

export const useHero = () => useContext(HeroContext);