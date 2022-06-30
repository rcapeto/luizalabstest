import { FunctionComponent } from 'react';

import fullStar from '../../../../assets/avaliacao_on.svg';
import emptyStar from '../../../../assets/avaliacao_off.svg';

import styles from './styles.module.scss';

//Reponse api doesn't have hero hate, so I do a fake rate.
export const HeroRating: FunctionComponent = () => {
   const stars = [0, 0, 0, 0, 0];
   const rate = 3;

   for(let i = 0; i < rate; i++) stars[i] = 1;

   return(
      <div className={styles.rateContainer}>
         <h5>Rating:</h5>

         <div className={styles.stars} data-rate={rate}>
            {
               stars.map((star, index) => (
                  <img 
                     key={String(index)}
                     src={star === 0 ? emptyStar : fullStar} 
                     alt={star == 0 ? 'Estrela Incompleta': 'Estrela Completa'} 
                  />
               ))
            }
         </div>
      </div>
   );
};