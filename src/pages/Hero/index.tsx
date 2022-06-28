import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { useGetHero, useGetComics } from '../../hooks/useApi';

import styles from './styles.module.scss';

export const Hero: FunctionComponent = () => {
   const { heroId } = useParams<{ heroId: string }>();

   if(!heroId) return null;

   const { data: response, isError, isLoading } = useGetHero(+heroId);
   const { data } = useGetComics(+heroId);

   console.log('response', response);
   console.log('data', data);

   return(
      <h1>Hero</h1>
   );
};