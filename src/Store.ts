import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Book, BookApiResponse } from "./Book";
import { Movie, MovieApiResponse } from "./Movie";
import axiosSearch from './api/axiosSearch';
import axiosList from './api/axiosList';
import axiosMovieList from './api/axiosMovieList';
import requests from "./api/requests";

interface bookState {
  books: Book[];
  bestSellers: Book[] | undefined;
  newBooks: Book[] | undefined;
  specialBooks: Book[] | undefined;

  loading: boolean;
  error: string | null;
  
  fetchSearchBooks: (query: string | null) => Promise<void>;
  fetchBooks: (queryType: string | null) => Promise<Book[] | undefined>;
  setFilteredBooks: (books: Book[] | undefined) => void;
  setBestSellers: (books: Book[] | undefined) => void;
  setNewBooks: (books: Book[] | undefined) => void;
  setSpecialBooks: (books: Book[] | undefined) => void;
}

export const useBookStore = create(
  devtools(
    persist<bookState>(
      set => ({
        books: [],
        bestSellers: [],
        newBooks: [],
        specialBooks: [],
        loading: false, 
        error: null,
        fetchSearchBooks: async (query) => {
          set({ loading: true, error: null });
          if (!query) {
            set({ books: [], loading: false });
            return;
          }
          
          try {
            const res = await axiosSearch.get<BookApiResponse>('', {
              params: {
                Query: query
              }
            });
            set({ books: res.data.item, loading: false });
          } catch (err) {
            set({ error: '검색 데이터를 가져오는 데 실패했습니다.', loading: false });
          }
        },
        fetchBooks: async (queryType) => {
          set({ loading: true, error: null });      
          const cachedData = JSON.parse(localStorage.getItem('Book-Store') as string).state;
          if (cachedData?.bestSellers?.length > 0) {
            let filteredData;
            switch (queryType) {
              case 'bestSellers':
                filteredData = cachedData.bestSellers;
                break;
              case 'newBooks':
                filteredData = cachedData.newBooks;
                break;
              case 'specialBooks':
                filteredData = cachedData.specialBooks;
                break;
              default:
                filteredData = []; // 기본값으로 빈 배열
            }

            if (filteredData && filteredData.length > 0) {
              set({ loading: false });
              return filteredData; // queryType에 맞는 데이터 반환
            }
          }

          try {
            const res = await axiosList.get('', {
              params: { QueryType: queryType }
            });
            const data = res?.data?.item;
            if (data) {
              set({ loading: false });
              return data;
            } else throw new Error('데이터가 없습니다.');
          } catch (err) {
            console.error('데이터를 가져오는 데 실패했습니다:', err);
            set({ error: '데이터를 가져오는 데 실패했습니다.', loading: false });
          }
        },
        setFilteredBooks: (books) => set({ books }),
        setBestSellers: (books) => set({ bestSellers: books }),
        setNewBooks: (books) => set({ newBooks: books }),
        setSpecialBooks: (books) => set({ specialBooks: books })
      }),
      {
        name: 'Book-Store',
      }
    )
  )
)

interface movieState {
  movies: Movie[];
  topRatedMovies: Movie[] | undefined;
  trendingMovies: Movie[] | undefined;
  nowPlayingMovies: Movie[] | undefined;

  loading: boolean;
  error: string | null;

  fetchSearchMovies: (query: string | null) => Promise<void>;
  fetchMovies: (url: string) => Promise<Movie[] | undefined>;
  setFilteredMovies: (movies: Movie[] | undefined) => void;
  setTopRatedMovies: (movies: Movie[] | undefined) => void;
  setTrendingMovies: (movies: Movie[] | undefined) => void;
  setNowPlayingMovies: (movies: Movie[] | undefined) => void;
}

export const useMovieStore = create(
  devtools(
    persist<movieState>(
      set => ({
        movies: [],
        topRatedMovies: [],
        trendingMovies: [],
        nowPlayingMovies: [],
        movieCast: [],
        loading: false,
        error: null,
        fetchSearchMovies: async (query) => {
          set({ loading: true, error: null });
          if (!query) {
            set({ movies: [], loading : false});
            return;
          }
          try {
            const res = await axiosMovieList.get<MovieApiResponse>(`/search/movie?query=${query}`);
            set({ movies: res.data.results, loading: false });
          } catch (err) {
            set({ error: '검색 데이터를 가져오는 데 실패했습니다.', loading: false });
          }
        },
        fetchMovies: async (url) => {
          const cachedData = JSON.parse(localStorage.getItem('Movie-Store') as string).state;
          if (cachedData?.topRatedMovies?.length > 0) {
            let filteredData;
            switch (url) {
              case requests.fetchTopRated:
                filteredData = cachedData.topRatedMovies;
                break;
              case requests.fetchTrending:
                filteredData = cachedData.trendingMovies;
                break;
              case requests.fetchNowPlaying:
                filteredData = cachedData.nowPlayingMovies;
                break;
              default:
                filteredData = []; // 기본값으로 빈 배열
            }
            set({ loading: false });
            return filteredData; // queryType에 맞는 데이터 반환
          }

          try {
            const res = await axiosMovieList.get(url);
            const data = res?.data?.results.slice(0, 3); // 3개 데이터 임시
            set({ loading: false });
            return data;
          } catch (err) {
            set({ error: "데이터를 가져오는 데 실패했습니다.", loading: false });
          }
        },
        setFilteredMovies: (movies) => set({ movies }),
        setTopRatedMovies: (movies) => set({ topRatedMovies: movies }),
        setTrendingMovies: (movies) => set({ trendingMovies: movies }),
        setNowPlayingMovies: (movies) => set({ nowPlayingMovies: movies })
      }),
      {
        name: 'Movie-Store'
      }
    )
  )
)