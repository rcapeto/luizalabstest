import { FunctionComponent } from 'react';

import styles from './styles.module.scss';

export const Footer: FunctionComponent = () => {
   return(
      <footer className={styles.footerContainer}>
         <div className={styles.footerContent}>
            <p>©2022 Raphael Capeto</p>
         </div>
      </footer>
   );
};