import { ReactNode } from "react";
import { Hero } from './api';

export interface HeroContextProviderProps {
   children: ReactNode;
};

export interface HeroContextValues extends HeroState {
   handleFavoriteHero: (hero: Hero) => boolean;
   handleFilterHeroes: (heroes: Hero[], text: string) => void;
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
{ type: 'SET_FILTERED_HEROES', payload: { heroes: Hero[], text: string }} |
{ type: 'TOGGLE_FAVORITE_BUTTON' } |
{ type: 'TOGGLE_ORDER_BY_BUTTON' };