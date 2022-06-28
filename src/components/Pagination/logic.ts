const generatePagesArray = (from: number, to: number): number[] => {
   return [...new Array(to - from)]
      .map((_, index) => from + index + 1)
      .filter(page => page > 0);
}

export const usePagination = (
   currentPage: number,
   registersPerPage: number,
   totalCountOfRegisters: number,
) => {
   const siblingsCount = 1;

   const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

   const previousPages = currentPage > 1 ? 
      generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1) : []
   ;

   const nextPages = currentPage < lastPage ? 
      generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage)) : []
   ;

   const maxItemPerPage = registersPerPage * currentPage;
   const initialPageItem = currentPage > 1 ? (currentPage * registersPerPage + 1) - registersPerPage : 1;

   return {
      previousPages,
      nextPages,
      lastPage,
      maxItemPerPage,
      initialPageItem,
      siblingsCount
   };
};