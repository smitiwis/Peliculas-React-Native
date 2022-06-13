import {useEffect, Suspense, useState} from 'react';
import movieDB from '../api/movieDB';
import {I_MovieDBNowPlaying, Movie} from '../interfaces/movie.interface';

const useMoviesHook = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [peliculasCine, setPeliculasCine] = useState<Movie[]>([]);

  const getMovies = async () => {
    const res = await movieDB.get<I_MovieDBNowPlaying>('/now_playing');
    setPeliculasCine(res.data.results);
    setInterval(() => {
      setIsLoading(false);
    }, 5000 );
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {
    peliculasCine,
    isLoading,
  };
};

export default useMoviesHook;
