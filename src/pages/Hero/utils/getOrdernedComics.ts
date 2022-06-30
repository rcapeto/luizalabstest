import { ComicAPIData, GetResponse } from "../../../@types/api";

export const getOrdenedComics = (
   apiResponse: GetResponse<ComicAPIData[]> | undefined
): ComicAPIData[] => {
   return (
      apiResponse && apiResponse.data && Array.isArray(apiResponse.data) && 
      apiResponse.data.sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime())
   ) || [];
};