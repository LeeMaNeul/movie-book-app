import React, { useCallback, useEffect, useState } from 'react'
import './Header.css';
import axiosSearch from '../api/axiosSearch';
import axiosMovieList from '../api/axiosMovieList';

const Header = ({ 
  handleClick, 
  selected,
  searchQuery,
  onSearch,
  setFilteredBooks, // 책 검색 state 저장 함수
  setFilteredMovies // 영화 검색 state 저장 함수
}) => {
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const handleSearchChange = e => {
    const query = e.target.value;
    onSearch(query); // input 창에서 타이핑하면 onSearch 함수 실행되고, App.js에 있는 state에 저장됨 / 이 state를 BookList 컴포넌트에 전달해줌

    if (selected === 'Books') {
      if (debounceTimeout) clearTimeout(debounceTimeout);
  
      const timeout = setTimeout(() => {
        fetchSearchBooks(query);
      }, 500);
  
      setDebounceTimeout(timeout);
    }
  }

  const fetchSearchBooks = useCallback(async (Query) => {
    if (!Query) {
      setFilteredBooks([]); // 검색 후 지울 경우 기본 책 리스트 출력
      return; // 검색어 없으면 API 호출 X
    }

    const cachedData = localStorage.getItem(Query);
    if (cachedData) {
      setFilteredBooks(JSON.parse(cachedData)); // localStorage에 검색한 책이 저장되어 있으면 API 호출 없이 바로 사용
      return;
    }

    try {
      const res = await axiosSearch.get('https://cors-anywhere.herokuapp.com/http://www.aladin.co.kr/ttb/api/ItemSearch.aspx', {
        params: {
          Query
        }
      });
      setFilteredBooks(res.data.item);
      localStorage.setItem(Query, JSON.stringify(res.data.item));
    } catch (err) {
      console.log(err);
    }
  }, [setFilteredBooks]);

  const fetchSearchMovies = useCallback(async query => {
    if (!query) {
      setFilteredMovies([]);
      return;
    }
    try {
      const res = await axiosMovieList.get(`/search/movie?query=${query}`);
      setFilteredMovies(res.data.results);
    } catch (err) {
      console.log(err);
    }
  }, [setFilteredMovies]);

  useEffect(() => {
    fetchSearchMovies(searchQuery);
  }, [fetchSearchMovies, searchQuery]);
  
  
  return (
    <header>
      <div className='inner'>
        <a href='/' className='logo'>Book & Moov</a>
        <ul className='links'>
          <li className={`link ${selected === 'Books' ? 'active' : ''}`}><a href="javascript:void(0)" onClick={() => handleClick('Books')}>Books</a></li>
          <li className={`link ${selected === 'Movies' ? 'active' : ''}`}><a href="javascript:void(0)" onClick={() => handleClick('Movies')}>Movies</a></li>
          <li className={`link ${selected === 'About' ? 'active' : ''}`}><a href="javascript:void(0)" onClick={() => handleClick('About')}>About</a></li>
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
}

export default Header