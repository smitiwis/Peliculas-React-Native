import axios from 'axios';

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: 'e2c1fd0578c3d02aab5e1313b54dabf8',
    languaje: 'es-ES',
  },
});


export default movieDB;