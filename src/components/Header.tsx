import React, { useCallback, useEffect, useState } from 'react'
import './Header.css';
import { useBookStore, useMovieStore } from '../Store';
import { Link } from 'react-router-dom';

interface props {
  handleClick(li:string): void;
  selected: string;
  searchQuery: string;
  onSearch(q: string): void;
}

const Header:React.FC<props> = React.memo(({ 
  handleClick, 
  selected,
  searchQuery,
  onSearch
}) => {
  console.log('Header is rendering!');
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  const fetchSearchBooks = useBookStore(state => state.fetchSearchBooks);
  const fetchSearchMovies = useMovieStore(state => state.fetchSearchMovies);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const query:string = e.target.value;
    onSearch(query); // input 창에서 타이핑하면 onSearch 함수 실행되고, App.js에 있는 state에 저장됨 / 이 state를 BookList 컴포넌트에 전달해줌
    if (selected === 'Books') {
      if (debounceTimeout) clearTimeout(debounceTimeout);
  
      const timeout = setTimeout(() => {
        fetchSearchBooks(query);
      }, 500);
  
      setDebounceTimeout(timeout);
    }
  }, [fetchSearchBooks, onSearch])

  // const fetchSearchBooks = useCallback(async (Query: string): Promise<void> => {
  //   if (!Query) {
  //     setFilteredBooks([]); // 검색 후 지울 경우 기본 책 리스트 출력
  //     return; // 검색어 없으면 API 호출 X
  //   }

  //   const cachedData = localStorage.getItem(Query);
  //   if (cachedData) {
  //     setFilteredBooks(JSON.parse(cachedData)); // localStorage에 검색한 책이 저장되어 있으면 API 호출 없이 바로 사용
  //     return;
  //   }

  //   try {
  //     const res = await axiosSearch.get<BookApiResponse>('', {
  //       params: {
  //         Query
  //       }
  //     });
  //     setFilteredBooks(res.data.item);
  //     localStorage.setItem(Query, JSON.stringify(res.data.item));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [setFilteredBooks]);

  // const fetchSearchMovies = useCallback(async (query: string):Promise<void> => {
  //   if (!query) {
  //     setFilteredMovies([]);
  //     return;
  //   }
  //   try {
  //     const res = await axiosMovieList.get<MovieApiResponse>(`/search/movie?query=${query}`);
  //     setFilteredMovies(res.data.results);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [setFilteredMovies]);

  useEffect(() => {
    fetchSearchMovies(searchQuery);
  }, [fetchSearchMovies, searchQuery, fetchSearchBooks]);
  
  
  return (
    <header>
      <div className='inner'>
        <a href='/' className='logo'>Book & Moov</a>
        <ul className='links'>
          <li className={`link ${selected === 'Books' ? 'active' : ''}`}><Link to="/" onClick={() => handleClick('Books')}>Books</Link></li>
          <li className={`link ${selected === 'Movies' ? 'active' : ''}`}><Link to="/movies" onClick={() => handleClick('Movies')}>Movies</Link></li>
        </ul>
        <div className='search-wrapper'>
          <input 
            type='text'
            placeholder='Search for Title'
            value={searchQuery}
            onChange={e => handleSearchChange(e)}
          />
          <i className="fa-solid fa-magnifying-glass search"></i>
        </div>
      </div>
    </header>
  )
});

export default Header