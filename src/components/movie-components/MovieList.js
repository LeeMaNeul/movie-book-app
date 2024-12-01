import React, { useCallback, useEffect, useState } from 'react';
import axios from '../../api/axiosMovieList';
import styled from 'styled-components';
import MovieItem from './MovieItem';
import requests from '../../api/requests';

const MovieList = () => {
  const [topRated, setTopRated] = useState([]);
  const [trending, setTrending] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);

  const [movieCast, setMovieCast] = useState({});

  const fetchData = useCallback(async (url) => {
    const res = await axios.get(url);
    const data = res.data.results.slice(0, 3);
    return data;
  }, []);

  const fetchMovieCast = useCallback(async (id) => {
    try {
      const res = await axios.get(`/movie/${id}/credits`);
      const arr = {
        cast: res.data.cast.slice(0, 5),
        crew: res.data.crew.find(person => person.job === "Director")
      };
      return arr;
    } catch (err) {
      console.log(err);
    }
  });

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

      const castData = {};
      for (const movie of [...topRatedData, ...trendingData, ...nowPlayingData]) {
        const cast = await fetchMovieCast(movie.id);
        castData[movie.id] = cast;  // 영화 ID를 키로 출연진 데이터를 저장
      }
      setMovieCast(castData);
    } catch (err) {
      console.log(err);
    }
  }, [fetchData]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div>
      <Category>Top Rated</Category>
      <Wrapper>
        {topRated.map((movie) => {
          const backdropUrl = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
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
          const backdropUrl = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
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
          const backdropUrl = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
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
`