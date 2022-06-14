import movieDB from '../api/movieDB';
import { Movie, MovieFull, CastDetails, Cast } from '../interfaces/movie.interface';
import { useEffect, useState } from 'react';


interface MovieDetails {
  isLoading?: boolean;
  movieFull?: MovieFull,
  castDetail?: Cast[]
}

const useMovieDetailsHook = (movieId: number) => {

  const [moreDetails, setMoreDetails] = useState<MovieDetails>({
    isLoading: true,
    movieFull: undefined,
    castDetail: undefined
  })

  const getDetailsMovie = async () => {
    const moreDetailsPromise = movieDB.get<MovieFull>(`/${movieId}`);
    const castDetailsPromise = movieDB.get<CastDetails>(`/${movieId}/credits`);

    const [moreDetailsResp, castDetailsResp] = await Promise.all([moreDetailsPromise, castDetailsPromise])

    setMoreDetails({
      isLoading: false,
      movieFull: moreDetailsResp.data,
      castDetail: castDetailsResp.data.cast
    })
  }

  useEffect(() => { getDetailsMovie() }, [])

  return {
    ...moreDetails 
  }
}


export default useMovieDetailsHook;
