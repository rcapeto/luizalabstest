import axios from 'axios';
import md5 from 'md5';

const baseURL = import.meta.env.VITE_APP_API_URL;
const apikey = import.meta.env.VITE_APP_API_KEY_PUBLIC;
const apikeyPrivate = import.meta.env.VITE_APP_API_KEY_PRIVATE;

const time = Number(new Date());
const hash = md5(time + apikeyPrivate + apikey);

export const api = axios.create({
   baseURL,
   params: { apikey, ts: time, hash }
});