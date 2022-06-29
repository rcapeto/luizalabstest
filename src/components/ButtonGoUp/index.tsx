import { FunctionComponent, useEffect, useState } from 'react';
import { BiChevronUp } from 'react-icons/bi';

import styles from './styles.module.scss';

export const ButtonGoUp: FunctionComponent = () => {
   const [showBtn, setShowBtn] = useState<boolean>(false);

   const handleGoUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

   const handleControlBtnState = () => {
      const screenHeight = window.innerHeight;
      const positionTop = window.scrollY;
      const percent = +((positionTop * 100) / screenHeight).toFixed(2);
      setShowBtn(percent >= 40);
   };

   useEffect(() => {
      window.addEventListener('scroll', handleControlBtnState);
      return () => window.removeEventListener('scroll', handleControlBtnState);
   }, []);
   
   return(
      <button 
         className={`${styles.buttonGoUpContainer} ${styles[showBtn ? 'show' : 'hide']}`} 
         onClick={handleGoUp}
      >
         <BiChevronUp color="#fff" size={22} />
      </button>
   );
};