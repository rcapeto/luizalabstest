import { FunctionComponent } from 'react';
import { BiSearch } from 'react-icons/bi';

import { useGetHeroesWithText } from '../../hooks/useApi';

import { Loading } from '../Loading';
import { HeroSearchItem } from './components/HeroSearchItem';

import searchBarRed from '../../assets/search_bar_vermelho.svg';
import searchBarWhite from '../../assets/search_bar_branco.svg';

import styles from './styles.module.scss';

export interface SearchBarProps {
   isHomePage?: boolean;
   text: string;
   onChangeText: (text: string) => void;
};

export const SearchBar: FunctionComponent<SearchBarProps> = ({
   isHomePage = true,
   text,
   onChangeText
}) => {
   const { data: response, isLoading } = useGetHeroesWithText(text);

   return(
      <div 
         className={`${styles.searchBarContainer} ${!isHomePage ? styles.isHero : ''} ${text.trim().length ? styles.hasText : ''}`} 
         style={{ backgroundImage: `url(${isHomePage ? searchBarRed : searchBarWhite})` }}
      >
         <BiSearch color="#e23636" size={22}/>
         <input 
            type="text"
            value={text}
            onChange={({ target: { value }}) => onChangeText(value)}
            placeholder="Procure por heróis"
            className={!isHomePage ? styles.notHome : ''}
         />

         {
            !isHomePage && text.trim().length > 0 && (
               <div className={styles.heroesContainer}>
                  {
                     isLoading ? (
                        <div className={styles.center}>
                           <Loading />
                        </div>
                     ) : (
                        <>
                           {
                              response?.data && response.data.length > 0  ? response.data.map(
                                 hero => (
                                    <HeroSearchItem 
                                       name={hero.name}
                                       key={String(hero.id)}
                                       id={hero.id}
                                       image={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
                                       comicsQuantity={hero.comics.available}
                                       moviesQuantity={hero.series.available}
                                       onHandleClick={() => onChangeText('')}
                                    />
                                 )
                              ) : (
                                 <div className={styles.center}>
                                    <h5>Ops... nenhum heroi encontrado</h5>
                                 </div>
                              )
                           }
                        </>
                     )
                  }
               </div>
            )
         }
      </div>
   );
};