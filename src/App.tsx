import { QueryClientProvider } from 'react-query';

import { ApplicationRoutes } from "./ApplicationRoutes";
import { client } from './config/react-query';
import { HeroContextProvider } from './context/HeroContext';
import { ButtonGoUp } from './components/ButtonGoUp';

import './global.scss';

export default function App() {
  return(
    <QueryClientProvider client={client}>
      <HeroContextProvider>
        <ApplicationRoutes />
        <ButtonGoUp />
      </HeroContextProvider>
    </QueryClientProvider>
  );
}