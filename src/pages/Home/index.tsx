import { FunctionComponent, useState, useEffect } from 'react';
import { Hero } from '../../@types/api';

import { Header } from '../../components/Header';
import { HeroList } from '../../components/HeroList';
import { useHero } from '../../context/HeroContext';
import { useGetHeroes } from '../../hooks/useApi';

import styles from './styles.module.scss';

export const Home: FunctionComponent = () => {
   const [text, setText] = useState('');
   const [heroes, setHeroes] = useState<Hero[]>([]);
   const [filterHeroesWithText, setFilterHeroesWithText] = useState<Hero[]>([]);
   const [page, setPage] = useState<number>(1);

   const { activeFavoriteButton, favoritedHeroes, activeOrderByButton } = useHero();
   const { data: response, isLoading, isError } = useGetHeroes(page);

   useEffect(() => {
      const data = activeFavoriteButton ? favoritedHeroes : ((response && Array.isArray(response.data) && response.data) || []);

      if(activeOrderByButton) { 
         setHeroes(data.sort((a, b) => a.name < b.name ? - 1 : 1));
      } else {
         setHeroes(data);
      }
   }, [response, activeFavoriteButton, activeOrderByButton, favoritedHeroes]);

   useEffect(() => {
      const value = text.toLowerCase();

      setFilterHeroesWithText(
         heroes.filter(hero => hero.name.toLowerCase().includes(value))
      );
   }, [text]);

   return(
      <main className={styles.homeContainer}>
         <Header 
            text={text}
            onChangeText={setText}
         />
         <HeroList 
            heroes={text.trim().length > 0 ? filterHeroesWithText : heroes}
            isError={isError}
            isLoading={isLoading}
            page={page}
            onChangePage={setPage}
            totalHeroes={
               text.trim().length > 0 ? 
               filterHeroesWithText.length : 
               activeFavoriteButton ? favoritedHeroes.length :
               (response?.total ?? 0)
            }
         />
      </main>
   );
};