import { FunctionComponent, useState, useEffect } from 'react';

import { Hero } from '../../@types/api';
import { useGetHeroes } from '../../hooks/useApi';

import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { HeroList } from '../../components/HeroList';
import { useHero } from '../../context/HeroContext';

import styles from './styles.module.scss';

export const Home: FunctionComponent = () => {
   const [text, setText] = useState('');
   const [heroes, setHeroes] = useState<Hero[]>([]);
   const [filterHeroesWithText, setFilterHeroesWithText] = useState<Hero[]>([]);
   const [page, setPage] = useState<number>(1);

   const { activeFavoriteButton, favoritedHeroes, activeOrderByButton } = useHero();
   const { data: response, isLoading, isError } = useGetHeroes(page, activeOrderByButton);

   useEffect(() => {
      const data = activeFavoriteButton ? favoritedHeroes : ((response && Array.isArray(response.data) && response.data) || []);
      setHeroes(data);
   }, [response, activeFavoriteButton, favoritedHeroes]);

   useEffect(() => {
      const value = text.toLowerCase();

      setFilterHeroesWithText(
         heroes.filter(hero => hero.name.toLowerCase().includes(value))
      );
   }, [text]);

   return(
      <main className={styles.homeContainer}>
         <div className={styles.homeContent}>
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
         </div>
         <Footer />
      </main>
   );
};