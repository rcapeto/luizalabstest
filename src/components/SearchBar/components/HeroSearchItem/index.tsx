import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import icComics from '../../../../assets/ic_quadrinhos.svg';
import icMovies from '../../../../assets/ic_trailer.svg';

import { client } from '../../../../config/react-query';
import { getHero } from '../../../../services/get';
import styles from './styles.module.scss';

export interface HeroSearchProps {
   image: string;
   name: string;
   moviesQuantity: number;
   comicsQuantity: number;
   id: number;
   onHandleClick?: () => void;
};

export const HeroSearchItem: FunctionComponent<HeroSearchProps> = ({
   image, comicsQuantity, name, moviesQuantity, id, onHandleClick
}) => {
   const handlePrefecthHero = async (heroId: number) => {
      await client.prefetchQuery(['hero-pre-fetching', heroId], async () => {
         try {
            const response = await getHero(heroId);
            return response.data;
         } catch(err) {
            console.error('Error prefetching hero');
            return undefined;
         }
      });
   };

   return(
      <Link 
         to={`/hero/${id}`} 
         className={styles.anchor} 
         onMouseOver={() => handlePrefecthHero(id)}
         onClick={onHandleClick}
      >
         <div className={styles.heroItemContainer}>
            <img src={image} alt={name} />
            <div className={styles.heroContent}>
               <span>{name}</span>
               <div className={styles.infos}>
                  <div className={styles.info}>
                     <strong>Quadrinhos</strong>
                     <div>
                        <img src={icComics} alt="Ícone de Quadrinhos" />
                        <span>{comicsQuantity}</span>
                     </div>
                  </div>
                  <div className={styles.info}>
                     <strong>Filmes</strong>

                     <div>
                        <img src={icMovies} alt="Ícone de Filmes" />
                        <span>{moviesQuantity}</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Link>
   );
};