import { FunctionComponent } from 'react';
import { FaSpinner } from 'react-icons/fa';

import styles from './styles.module.scss';

export const Loading: FunctionComponent = () => {
   return(
      <div className={styles.loadingContainer}>
         <div className={styles.svg}>
            <FaSpinner color="#e23636" size={20}/>
         </div>
         <p>Carregando...</p>
      </div>
   );
};