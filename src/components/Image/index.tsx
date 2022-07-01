import { FunctionComponent, useState } from 'react';

import styles from './styles.module.scss';

interface ImageProps {
   alt: string;
   src: string;
   className?: string;
};

export const Image: FunctionComponent<ImageProps> = props => {
   const [isLoading, setIsLoading] = useState(true);

   return(
      <div className={`${isLoading ? styles.shimmerEffectContainer : ''} ${styles.container}`}>
         {
            isLoading && <p>Carregando...</p>
         }
         <img 
            {...props}
            onLoad={() => setIsLoading(false)}
            style={{ display: isLoading ? 'none' : 'initial' }}
         />
      </div>
   );
};