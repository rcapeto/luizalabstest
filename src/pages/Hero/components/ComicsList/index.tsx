import { FunctionComponent } from 'react';

import { ComicAPIData } from '../../../../@types/api';

import { Error } from '../../../../components/Error';
import { Loading } from '../../../../components/Loading';

import styles from './styles.module.scss';

interface ComicsListProps {
   comics: ComicAPIData[];
   isLoading: boolean;
   isError: boolean;
};

export const ComicsList: FunctionComponent<ComicsListProps> = ({
   comics,
   isError,
   isLoading
}) => {
   return(
      <div className={styles.comicsListContainer}>
         {
            isLoading && !isError ? (
               <div className={styles.center}>
                  <Loading /> 
               </div>
            ) : isError ? (
               <div className={styles.center}>
                  <Error /> 
               </div>
            ) : (
               <div className={styles.comicsItems}>
                  {
                     comics.map(comic => (
                        <div className={styles.comicItem} key={String(comic.id)}>
                           <img 
                              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} 
                              alt={`Imagem de capa do quadrinho ${comic.title}`} 
                           />
                           <p>{comic.title}</p>
                        </div>
                     ))
                  }
               </div>
            )
         } 
      </div>
   );
};