import { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Redirect: FunctionComponent = () => {
   const navigate = useNavigate();
   
   useEffect(() => {
      navigate('/');
   }, []);

   return null;
};