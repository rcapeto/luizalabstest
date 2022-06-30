import { FunctionComponent } from 'react';

import { Hero } from '../../../../@types/api';

import { useHero } from '../../../../context/HeroContext';
import { Loading } from '../../../../components/Loading';
import { HeroItem } from './components/Hero';
import { Error } from '../../../../components/Error';
import { Pagination } from '../../../../components/Pagination';

import imageHero from '../../../../assets/ic_heroi.svg';
import toggleON from '../../../../assets/toggle_on.svg';
import toggleOFF from '../../../../assets/toggle_off.svg';
import favoriteON from '../../../../assets/favorito_01.svg';
import favoriteOFF from '../../../../assets/favorito_02.svg';

import styles from './styles.module.scss';

interface HeroListProps {
   heroes: Hero[];
   isLoading: boolean;
   isError: boolean;
   page: number;
   onChangePage: (page: number) => void;
   totalHeroes: number;
};

export const HeroList: FunctionComponent<HeroListProps> = ({
   heroes,
   isError,
   isLoading,
   page,
   onChangePage,
   totalHeroes
}) => {
   const { 
      activeFavoriteButton, 
      activeOrderByButton, 
      toggleFavoriteButton, 
      toggleOrderByButton, 
   } = useHero();

   return(
      <div className={styles.heroListContainer}>
         <header className={styles.header}>
            <div className={styles.left}>
               <p>Encontrados {totalHeroes} heróis</p>
            </div>
            <div className={styles.right}>
               <button onClick={toggleOrderByButton}>
                  <img src={imageHero} alt="Emoji de um super-herói" />
                  <p>Ordernar por nome A/Z</p>
                  <img 
                     src={activeOrderByButton ? toggleON : toggleOFF} 
                     alt={activeOrderByButton ? 'Toggle Ativado' : 'Toggle Desativado'} 
                     className={styles.toggle}
                  />
               </button>
               <button onClick={toggleFavoriteButton}>
                  <img src={activeFavoriteButton ? favoriteON : favoriteOFF} alt="Coração vermelho" />
                  <p>Somente Favoritos</p>
               </button>
            </div>
         </header>

         <section>
            {
               heroes.length > 0 && (
                  <div className={styles.pagination}>
                     <Pagination 
                        onPageChange={onChangePage}
                        totalCountOfRegisters={totalHeroes}
                        currentPage={page}
                        registersPerPage={20}
                     />
                  </div>
               )
            }
            {
               isLoading && !isError ? (
                  <Loading /> 
               ) : isError ? (
                  <Error />
               ) : (
                  <div className={styles.heroListContent}>
                     {
                        heroes.map(hero => (
                           <HeroItem hero={hero} key={String(hero.id)}/>
                        ))
                     }
                  </div>
               )
            } 
         </section>
      </div>
   );
};