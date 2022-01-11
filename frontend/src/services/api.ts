import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ecommerce-dio.herokuapp.com/',
});

export { api };
