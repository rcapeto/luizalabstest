import { ReactNode } from "react";
import { Hero } from './api';

export interface HeroContextProviderProps {
   children: ReactNode;
};

export interface HeroContextValues extends HeroState {
   handleFavoriteHero: (hero: Hero) => boolean;
   toggleFavoriteButton: () => void;
   toggleOrderByButton: () => void;
   hasHeroInFavorites: (heroId: number) => boolean;
};

export interface HeroState {
   favoritedHeroes: Hero[];
   filteredHeroes: Hero[];
   activeFavoriteButton: boolean;
   activeOrderByButton: boolean;
};

export type HeroActions = 
{ type: 'HANDLE_FAVORITE_HERO', payload: { hero: Hero }} | 
{ type: 'SET_FAVORITES_HEROES', payload: { favoritedHeroes: Hero[] }} | 
{ type: 'TOGGLE_FAVORITE_BUTTON' } |
{ type: 'TOGGLE_ORDER_BY_BUTTON' };