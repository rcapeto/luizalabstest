import { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';

import { Hero } from '../../../../@types/api';
import favoriteON from '../../../../assets/favorito_01.svg';
import favoriteOFF from '../../../../assets/favorito_02.svg';
import { useHero } from '../../../../context/HeroContext';
import { client } from '../../../../config/react-query';
import { getHero } from '../../../../services/get';

import styles from './styles.module.scss';

interface HeroItemProps {
   hero: Hero;
}

export const HeroItem: FunctionComponent<HeroItemProps> = ({ hero }) => {
   const { hasHeroInFavorites, handleFavoriteHero } = useHero();
   const [isFavorite, setIsFavorite] = useState<boolean>(hasHeroInFavorites(hero.id));

   const image = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;

   const favoriteItem = () => {
      const hasAdd = handleFavoriteHero(hero);
      hasAdd && setIsFavorite(!isFavorite);
   };

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
      <div className={styles.heroItemContainer} onMouseOver={() => handlePrefecthHero(hero.id)}>
         <Link to={`/hero/${hero.id}`}>
            <img src={image} alt={hero.name} className={styles.image}/>
         </Link>

         <div>
            <p>{hero.name}</p>

            <button onClick={favoriteItem}>
               <img 
                  src={isFavorite ? favoriteON : favoriteOFF} 
                  alt={isFavorite ? 'Heroi favoritado' : 'Heroi não favoritado'} 
               />
            </button>
         </div>        
      </div>
   );
};