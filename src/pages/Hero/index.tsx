import { FunctionComponent, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useGetComics } from '../../hooks/useApi';
import { getHero } from '../../services/get';
import { useHero } from '../../context/HeroContext';
import { Hero as HeroType } from '../../@types/api';
import { client } from '../../config/react-query';
import { formatDate } from './utils/formatData';
import { getOrdenedComics } from './utils/getOrdernedComics';
import { variables } from '../../config/variables';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Loading } from '../../components/Loading';
import { Error } from '../../components/Error';
import { ComicsList } from './components/ComicsList';
import { HeroRating }  from './components/HeroRating';

import favoriteON from '../../assets/favorito_01.svg';
import favoriteOFF from '../../assets/favorito_02.svg';
import icComics from '../../assets/ic_quadrinhos.svg';
import icMovies from '../../assets/ic_trailer.svg';

import styles from './styles.module.scss';

export const Hero: FunctionComponent = () => {
   const { heroId } = useParams<{ heroId: string }>();
   const navigate = useNavigate();
   const { hasHeroInFavorites, handleFavoriteHero } = useHero();

   const [text, setText] = useState('');
   const [currentHero, setCurrentHero] = useState<HeroType | null>(null);
   const [isLoadingPage, setIsLoadingPage] = useState(false);
   const [isFavorite, setIsFavorite] = useState<boolean>(false);

   const handleCheckCacheHero = async (heroId: number) => {
      setIsLoadingPage(true);

      const queryCache = client.getQueryCache();
      const currentHeroCache = queryCache.find<HeroType>([variables.react_query.hero_pre_fetching, heroId]);

      if(currentHeroCache && currentHeroCache.state.data) {
         setCurrentHero(currentHeroCache.state.data);
         setIsFavorite(hasHeroInFavorites(currentHeroCache.state.data.id));
      } else {
         try {
            const response = await getHero(heroId);
            setCurrentHero(response.data);

            response.data && setIsFavorite(hasHeroInFavorites(response.data.id));
         } catch(err) {
            console.log('Error load Hero');
         }
      }
      setIsLoadingPage(false);
   };

   const favoriteItem = () => {
      if(!currentHero) return;

      const hasAdd = handleFavoriteHero(currentHero);
      hasAdd && setIsFavorite(!isFavorite);
   };

   useEffect(() => {
      (async() => {
         !heroId ? navigate('/') : await handleCheckCacheHero(+heroId);
      })();
   }, [heroId]);

   const { 
      data: comicsResponse,
      isError: isErrorComics,
      isLoading: isLoadingComics,
   } = useGetComics(Number(heroId ?? 0));

   if(isLoadingPage) {
      return(
         <div className={styles.fullPageCenter}>
            <Loading />
         </div>   
      );
   }

   if(!currentHero) {
      return(
         <div className={styles.fullPageCenter}>
            <Error />
         </div>   
      );
   }

   const ordernedComics = getOrdenedComics(comicsResponse);

   return(
      <main className={styles.heroPage}>
         <Header 
            isHomePage={false}
            onChangeText={setText}
            text={text} 
         />

         <div className={styles.heroContent}>
            <section className={styles.hero}>
               <div className={styles.left}>
                  <header>
                     <p>{currentHero.name}</p>

                     <button onClick={favoriteItem}>
                        <img 
                           src={isFavorite ? favoriteON : favoriteOFF} 
                           alt={isFavorite ? 'Heroi favoritado' : 'Heroi não favoritado'} 
                        />
                     </button>
                  </header>

                  <p>{currentHero.description}</p>

                  <div className={styles.info}>
                     <div className={styles.infoItem}>
                        <strong>Quadrinhos</strong>
                        <span>
                           <img src={icComics} alt="Ícone de Quadrinos" />
                           <p>{currentHero.comics.available}</p>
                        </span>
                     </div>
                     <div className={styles.infoItem}>
                        <strong>Filmes</strong>
                        <span>
                           <img src={icMovies} alt="Ícone de Filmes" />
                           <p>{currentHero.series.available}</p>
                        </span>
                     </div>
                  </div>

                  <HeroRating />

                  {
                     ordernedComics && ordernedComics[0] && (
                        <div className={styles.lastComic}>
                           <p>
                              <strong>Último quadrinho:</strong> {formatDate(ordernedComics[0].modified)}
                           </p>
                        </div>
                     )
                  }

               </div>
               <div className={styles.right}>
                  <img 
                     src={`${currentHero.thumbnail.path}.${currentHero.thumbnail.extension}`} 
                     alt={currentHero.name} 
                  />
               </div>
            </section>

            <section className={styles.comicsContainer}>
               <h2>Últimos Lançamentos</h2>

               <ComicsList 
                  isError={isErrorComics}
                  isLoading={isLoadingComics}
                  comics={comicsResponse?.data ?? []}
               />
            </section>
         </div>

         <Footer />
      </main>
   );
};