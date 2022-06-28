import { FunctionComponent } from 'react';
import { FaSadCry } from 'react-icons/fa';

import styles from './styles.module.scss';

export const Error: FunctionComponent = () => {
   return(
      <div className={styles.errorContainer}>
         <p>Ops... ocorreu um erro inesperado!</p>
         <FaSadCry color="#e23636" size={20} />
      </div>
   );
};