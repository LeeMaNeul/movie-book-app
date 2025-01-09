import React, { Suspense, useCallback, useEffect, useState } from 'react';
import axios from '../../api/axiosMovieList';
import styled from 'styled-components';
import requests from '../../api/requests';
import { Movie, Character } from '../../Movie';
import { useMovieStore } from '../../Store';

const IMAGE_BASE_URL: string = 'https://image.tmdb.org/t/p/w1280';

interface props {
  searchQuery: string | null;
}

const MovieItem = React.memo(React.lazy(() => import('./MovieItem')));

type MovieCast = {
  cast: [{
    id: number;
    name: string;
  }];
  crew?: {
    id: number;
    name: string;
    job: string;
  };
};

type MovieCastMap = {
  [key: string]: MovieCast | null;
};

const MovieList:React.FC<props> = ({ searchQuery }) => {
  // // 각 리스트 저장 state
  const {
    topRatedMovies, setTopRatedMovies,
    trendingMovies, setTrendingMovies,
    nowPlayingMovies, setNowPlayingMovies
  } = useMovieStore();
  const fetchData = useMovieStore(state => state.fetchMovies);
  const filteredMovies = useMovieStore(state => state.movies);

  const [movieCast, setMovieCast] = useState<MovieCastMap>({}); // 특정 컴포넌트에서만 사용되는 데이터는 로컬 state 사용

  // input 입력은 했으나 검색 결과가 없는 경우
  const isNoResults = searchQuery && filteredMovies.length === 0; 

  // 특정 영화 출연진 및 감독진 정보 가져오기
  const fetchMovieCast = useCallback(async (id: number) => { 
    try {
      const res = await axios.get<Character>(`/movie/${id}/credits`); // baseUrl에 주소 이어서 붙이기
      const arr = {
        cast: res.data.cast.slice(0, 5),
        crew: res.data.crew.find(person => person.job === "Director")
      };
      return arr;
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchMovies = useCallback(async (): Promise<void> => {
    try {
      const [topRatedData, trendingData, nowPlayingData] = await Promise.all([
        fetchData(requests.fetchTopRated),
        fetchData(requests.fetchTrending),
        fetchData(requests.fetchNowPlaying),
      ]);
      setTopRatedMovies(topRatedData);
      setTrendingMovies(trendingData);
      setNowPlayingMovies(nowPlayingData);

      if (topRatedData && trendingData && nowPlayingData) {
        const castData = await Promise.all(
          [...topRatedData, ...trendingData, ...nowPlayingData, ...filteredMovies].map(async (movie: Movie) => {
            const cast = await fetchMovieCast(movie.id);
            return { [movie.id]: cast };
          })
        )
        setMovieCast(Object.assign({}, ...castData));
      }
    } catch (err) {
      console.log(err);
    }
  }, [fetchData, fetchMovieCast, filteredMovies]); 

  const renderFilteredMovies = useCallback(() => {
    return filteredMovies.map(movie => {
      const backdropUrl = `${IMAGE_BASE_URL}${movie.backdrop_path}`;
      return (
        <Suspense key={movie.id} fallback={<div>Loading MovieItem...</div>}>
          <MovieItem 
            movie={movie}
            backdropUrl={backdropUrl}
            cast={movieCast[movie.id] || undefined}
          />
        </Suspense>
      )
    })
  }, [filteredMovies, movieCast]);

  const renderMovieCategory = useCallback((movies: Movie[] | undefined) => {
    return movies?.map(movie => {
      const backdropUrl = `${IMAGE_BASE_URL}${movie.backdrop_path}`;
      return (
        <Suspense key={movie.id}>
          <MovieItem 
            movie={movie}
            backdropUrl={backdropUrl}
            cast={movieCast[movie.id] || undefined}
          />
        </Suspense>
      )
    })
  }, [movieCast]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div>
      {isNoResults ? 
        (<>
          <Category className='not-found'>"{searchQuery}" 검색 결과가 없습니다.</Category>
        </>) :
        (<>
          {filteredMovies.length > 0 ? 
            (<>
              <Category>"{searchQuery}" 검색 결과</Category>
              <Wrapper>{renderFilteredMovies()}</Wrapper>
            </>) : 
            (<>
              <Category>Top Rated</Category>
              <Wrapper>{renderMovieCategory(topRatedMovies)}</Wrapper>
              <Category>Trending</Category>
              <Wrapper>{renderMovieCategory(trendingMovies)}</Wrapper>
              <Category>Now Playing</Category>
              <Wrapper>{renderMovieCategory(nowPlayingMovies)}</Wrapper>
            </>)
          }
        </>)
      }
    </div>
  )
}

export default MovieList;

const Category = styled.h2 ``;

const Wrapper = styled.div `
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  };

  @media (max-width: 768px) {
    display: block;
  }
`