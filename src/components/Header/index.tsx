import { FunctionComponent } from 'react';

import styles from './styles.module.scss';
import small_logo from '../../assets/logo.svg';
import { SearchBar } from '../SearchBar';

export interface HeaderProps {
   isHomePage?: boolean;
   text: string;
   onChangeText: (text: string) => void;
};

export const Header: FunctionComponent<HeaderProps> = ({
   isHomePage = true,
   text,
   onChangeText
}) => {
   return(
      <header className={styles[isHomePage ? 'homePage' : 'heroPage']}>
         <div className={styles.home}>
            <img src={small_logo} alt="Símbolo da Marvel" />
            <h1>Explore o Universo</h1>
            <p>
               Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama -
               e aqueles que você descobrirá em breve! 
            </p>

            <div className={styles.searchBox}>
               <SearchBar 
                  isHomePage={isHomePage} 
                  text={text}
                  onChangeText={onChangeText}
               />
            </div>
         </div>
      </header>
   );
};