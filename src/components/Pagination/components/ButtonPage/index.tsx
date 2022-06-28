import { FunctionComponent } from "react";

import styles from './styles.module.scss';

export interface PageProps {
   number: number;
   isCurrent?: boolean;
   onPageChange: (page: number) => void;
};

export const ButtonPage: FunctionComponent<PageProps> = ({
   isCurrent, number, onPageChange
}) => {
   return (
      <button 
         onClick={() => onPageChange(number)} 
         className={`${styles.buttonPageContainer} ${isCurrent ? styles.isCurrent : ''}`}
      >
         { number }
      </button>
   );
};