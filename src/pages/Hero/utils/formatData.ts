import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

// I do that function because the api sometimes return wrong date and that breake the code.
export const formatDate = (date: string): string => {
   const dateConfig = "d MMM'.' y";
   const formatConfig = { locale: ptBR };

   try {
      return format(new Date(date), dateConfig, formatConfig);
   } catch(err) {
      console.error('Api returns wrong modified date');
      return 'n/a';
   }
};