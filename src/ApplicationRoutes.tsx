import { FunctionComponent } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';
import { Hero } from './pages/Hero';
import { Redirect } from './pages/Redirect';

export const ApplicationRoutes: FunctionComponent = () => {
   return(
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/hero" element={<Hero />}/>
            <Route path="/hero/:heroId" element={<Hero />}/>
            <Route path="*" element={<Redirect />} />
         </Routes>
      </BrowserRouter>
   );
};