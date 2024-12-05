import React, { useCallback, useEffect, useState } from 'react';
import axios from '../../api/axiosMovieList';
import styled from 'styled-components';
import MovieItem from './MovieItem';
import requests from '../../api/requests';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

const MovieList = ({ searchQuery, filteredMovies }) => {
  // 각 리스트 저장 state
  const [topRated, setTopRated] = useState([]);
  const [trending, setTrending] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);

  const [movieCast, setMovieCast] = useState({});

  const isNoResults = searchQuery && filteredMovies.length === 0; // input 입력은 했으나 검색 결과가 없는 경우

  const fetchData = useCallback(async (url) => { // 영화 리스트 가져오기
    const res = await axios.get(url);
    const data = res.data.results.slice(0, 3);
    return data;
  }, []);

  const fetchMovieCast = useCallback(async (id) => { // 특정 영화 출연진 및 감독진 정보 가져오기
    try {
      const res = await axios.get(`/movie/${id}/credits`); // baseUrl에 주소 이어서 붙이기
      const arr = {
        cast: res.data.cast.slice(0, 5),
        crew: res.data.crew.find(person => person.job === "Director")
      };
      return arr;
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchMovies = useCallback(async () => {
    try {
      const [topRatedData, trendingData, nowPlayingData] = await Promise.all([
        fetchData(requests.fetchTopRated),
        fetchData(requests.fetchTrending),
        fetchData(requests.fetchNowPlaying),
      ]);
      setTopRated(topRatedData);
      setTrending(trendingData);
      setNowPlaying(nowPlayingData);

      const castData = await Promise.all(
        [...topRatedData, ...trendingData, ...nowPlayingData, ...filteredMovies].map(async movie => {
          const cast = await fetchMovieCast(movie.id);
          return { 
            [movie.id]: cast
          };
        })
      )
      setMovieCast(Object.assign({}, ...castData));
    } catch (err) {
      console.log(err);
    }
  }, [fetchData, fetchMovieCast, filteredMovies]); // 해당 코드에서 사용되는 함수와 지속 변화가 있는 변수를 의존성 배열에 넣어야 함

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
              <Wrapper>
                {filteredMovies.map(movie => {
                  const backdropUrl = `${IMAGE_BASE_URL}${movie.backdrop_path}`;
                  return (
                    <MovieItem 
                      key={movie.id} 
                      movie={movie}
                      backdropUrl={backdropUrl}
                      cast={movieCast[movie.id]}
                    />
                  )
                })}
              </Wrapper>
            </>) : 
            (<>
              <Category>Top Rated</Category>
              <Wrapper>
                {topRated.map((movie) => {
                  const backdropUrl = `${IMAGE_BASE_URL}${movie.backdrop_path}`;
                  return (
                    <MovieItem 
                      key={movie.id} 
                      movie={movie} 
                      backdropUrl={backdropUrl}
                      cast={movieCast[movie.id]}
                    />
                  );
                })}
              </Wrapper>
              <Category>Trending</Category>
              <Wrapper>
                {trending.map((movie) => {
                  const backdropUrl = `${IMAGE_BASE_URL}${movie.backdrop_path}`;
                  return (
                    <MovieItem 
                      key={movie.id} 
                      movie={movie} 
                      backdropUrl={backdropUrl}
                      cast={movieCast[movie.id]}
                    />
                  );
                })}
              </Wrapper>
              <Category>Now Playing</Category>
              <Wrapper>
                {nowPlaying.map((movie) => {
                  const backdropUrl = `${IMAGE_BASE_URL}${movie.backdrop_path}`;
                  return (
                    <MovieItem 
                      key={movie.id} 
                      movie={movie} 
                      backdropUrl={backdropUrl}
                      cast={movieCast[movie.id]}
                    />
                  );
                })}
              </Wrapper>
            </>)
          }
        </>)
      }
    </div>
  )
}

export default MovieList;

const Category = styled.h2 `

`

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