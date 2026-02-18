import axios from 'axios';

export const api = axios.create({
  baseURL: '/api', // هنا السر: أي طلب هيبدأ بكلمة api تلقائياً
  withCredentials: true
});
