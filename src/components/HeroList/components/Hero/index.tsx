import { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';

import { Hero } from '../../../../@types/api';
import favoriteON from '../../../../assets/favorito_01.svg';
import favoriteOFF from '../../../../assets/favorito_02.svg';
import { useHero } from '../../../../context/HeroContext';

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

   return(
      <div className={styles.heroItemContainer}>
         <Link to={`/hero/${hero.id}`}>
            <img src={image} alt={hero.name} />
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