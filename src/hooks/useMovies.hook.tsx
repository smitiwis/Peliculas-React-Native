import {useEffect, Suspense, useState} from 'react';
import movieDB from '../api/movieDB';
import {I_MovieDBResponse, Movie} from '../interfaces/movie.interface';

interface moviesState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upComing: Movie[];
}

const useMoviesHook = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [moviesState, setMoviesState] = useState<moviesState>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upComing: [],
  });

  const getMovies = async () => {
    const nowPlayingPromise = movieDB.get<I_MovieDBResponse>('/now_playing');
    const popularPromise = movieDB.get<I_MovieDBResponse>('/popular');
    const topRatedPromise = movieDB.get<I_MovieDBResponse>('/top_rated');
    const upComingPromise = movieDB.get<I_MovieDBResponse>('/upcoming');

    const resp = await Promise.all([
      nowPlayingPromise,
      popularPromise,
      topRatedPromise,
      upComingPromise,
    ]);

    setMoviesState({
      nowPlaying: resp[0].data.results,
      popular: resp[1].data.results,
      topRated: resp[2].data.results,
      upComing: resp[3].data.results,
    });

    // setPeliculasCine(respNowPlaying.data.results);
    // setPeliculasPopulares(respPopular.data.results);

    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {
    ...moviesState,
    isLoading,
  };
};

export default useMoviesHook;
