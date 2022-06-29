export interface APIResponse<T> {
   code: number;
   status: string;
   data: {
      limit: number;
      count: number;
      total: number;
      results: T[];
   }
};

export interface GetResponse<T> {
   data: T | null;
   total?: number;
};

export interface Hero {
   id: number;
   name: string;
   description: string;
   thumbnail: {
      path: string;
      extension: string;
   };
   comics: {
      available: number;
      items: Comic[];
   };
   series: {
      available: number;
   };
   stories: {
      available: number;
   };
   events: {
      available: number;
   }
};

export interface Comic {
   resourceURI: string;
   name: string;
};

export interface ComicAPIData {
   id: number;
   title: string;
   description: string;
   pageCount: number;
   thumbnail: {
      path: string;
      extension: string;
   };
   modified: string;
};