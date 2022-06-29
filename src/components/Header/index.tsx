import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import big_logo from '../../assets/logo.svg';
import small_logo from '../../assets/logo_menor.svg';
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
         <div className={styles.content}>
            <Link to="/">
               <img src={isHomePage ? big_logo : small_logo} alt="Símbolo da Marvel" />
            </Link>
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

            <div className={styles.heroSeparator}/>
         </div>
      </header>
   );
};