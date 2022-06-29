import { FunctionComponent } from 'react';
import { BiSearch } from 'react-icons/bi';

import searchBarRed from '../../assets/search_bar_vermelho.svg';
import searchBarWhite from '../../assets/search_bar_branco.svg';

import styles from './styles.module.scss';

export interface SearchBarProps {
   isHomePage?: boolean;
   text: string;
   onChangeText: (text: string) => void;
};

export const SearchBar: FunctionComponent<SearchBarProps> = ({
   isHomePage = true,
   text,
   onChangeText
}) => {
   return(
      <div 
         className={`${styles.searchBarContainer} ${!isHomePage ? styles.isHero : ''}`} 
         style={{ backgroundImage: `url(${isHomePage ? searchBarRed : searchBarWhite})` }}
      >
         <BiSearch color="#e23636" size={22}/>
         <input 
            type="text"
            value={text}
            onChange={({ target: { value }}) => onChangeText(value)}
            placeholder="Procure por heróis"
            className={!isHomePage ? styles.notHome : ''}
         />
      </div>
   );
};