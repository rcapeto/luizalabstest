import { FunctionComponent, useState, useEffect } from 'react';

import { Hero } from '../../@types/api';
import { useGetHeroes, useGetHeroesWithText } from '../../hooks/useApi';

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { HeroList } from '../../components/HeroList';
import { useHero } from '../../context/HeroContext';

import styles from './styles.module.scss';

export const Home: FunctionComponent = () => {
   const [text, setText] = useState('');
   const [heroes, setHeroes] = useState<Hero[]>([]);
   const [filteredHeroesWithText, setFilteredHeroesWithText] = useState<Hero[]>([]);
   const [page, setPage] = useState<number>(1);

   const hasTextInSearchInput = text.trim().length > 0;

   const { activeFavoriteButton, favoritedHeroes, activeOrderByButton } = useHero();
   const { data: response, isLoading, isError } = useGetHeroes(page, activeOrderByButton);
   const { 
      data: heroesResponseWithText, 
      isLoading: isLoadingHeroesWithText,
      isError: isErrorHeroesWithText 
   } = useGetHeroesWithText(text);

   useEffect(() => {
      const data = 
         activeFavoriteButton ? 
         favoritedHeroes : 
            !(hasTextInSearchInput) ? 
            ((response && Array.isArray(response.data) && response.data) || []) : 
            ((heroesResponseWithText && Array.isArray(heroesResponseWithText.data) && heroesResponseWithText.data) || []);
      setHeroes(data);
   }, [response, activeFavoriteButton, favoritedHeroes, heroesResponseWithText, activeOrderByButton]);

   useEffect(() => {
      const heroesWithText = (
         (heroesResponseWithText && Array.isArray(heroesResponseWithText.data) && 
            heroesResponseWithText.data
         ) || []
      );

      setFilteredHeroesWithText(
         activeOrderByButton ? 
            heroesWithText.sort((a, b) => a.name < b.name ? -1 : 1) :
            heroesWithText.sort((a, b) => b.name < a.name ? -1 : 1)
      );
   }, [hasTextInSearchInput, activeOrderByButton, heroesResponseWithText]);

   return(
      <main className={styles.homeContainer}>
         <div className={styles.homeContent}>
            <Header 
               text={text}
               onChangeText={setText}
            />
            <HeroList 
               heroes={hasTextInSearchInput && activeOrderByButton ? filteredHeroesWithText : heroes}
               isError={hasTextInSearchInput ? isErrorHeroesWithText : isError}
               isLoading={hasTextInSearchInput ? isLoadingHeroesWithText : isLoading}
               page={page}
               onChangePage={setPage}
               totalHeroes={
                  activeFavoriteButton ? 
                  favoritedHeroes.length : 
                     (hasTextInSearchInput) ? 
                        (heroesResponseWithText?.total ?? 0) : 
                        (response?.total ?? 0)
               }
            />
         </div>
         <Footer />
      </main>
   );
};