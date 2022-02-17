import axios from 'axios';

const baseURL = 'https://ecommerce-dio.herokuapp.com';

const api = axios.create({
  baseURL,
});

export { api, baseURL };
