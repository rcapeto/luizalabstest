import { FunctionComponent } from "react";

import { usePagination } from './logic';
import { ButtonPage } from './components/ButtonPage';
import { PaginationDot } from './components/PaginationDot';

import styles from './styles.module.scss';

export interface PaginationProps {
   totalCountOfRegisters: number;
   registersPerPage?: number;
   currentPage?: number;
   onPageChange: (page: number) => void;
};

export const Pagination: FunctionComponent<PaginationProps> = ({ 
   onPageChange, totalCountOfRegisters, registersPerPage = 10, currentPage = 1
}) => {
   const { 
      initialPageItem, 
      lastPage,
      maxItemPerPage,
      nextPages,
      previousPages,
      siblingsCount
   } = usePagination(currentPage, registersPerPage, totalCountOfRegisters);

   return(
      <div className={styles.paginationContainer}>
         <div className={styles.info}>
            Listando heróis de <strong>{initialPageItem}</strong> à <strong>{maxItemPerPage}</strong> de {totalCountOfRegisters}
         </div>

         <div className={styles.paginationContent}>
            {
               currentPage > (1 + siblingsCount) && (
                  <>
                     <ButtonPage 
                        number={1}
                        onPageChange={onPageChange}
                     />
                     { 
                        currentPage > (2 + siblingsCount) && <PaginationDot/>
                     }
                  </>
               )
            }

            {
               previousPages.length > 0 && previousPages.map(page => 
                  <ButtonPage key={page} number={page} onPageChange={onPageChange}/>
               )
            }
            
            <ButtonPage isCurrent number={currentPage} onPageChange={onPageChange}/>

            {
               nextPages.length > 0 && nextPages.map(page => 
                  <ButtonPage key={page} number={page} onPageChange={onPageChange}/>
               )
            }

            {
               (currentPage + siblingsCount) < lastPage && (
                  <>
                     { 
                        (currentPage + 1 + siblingsCount) < lastPage && <PaginationDot/>
                     }
                     <ButtonPage number={lastPage} onPageChange={onPageChange}/>
                  </>
               )
            }
         </div>
      </div>
   );
};