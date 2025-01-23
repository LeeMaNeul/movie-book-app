import React, { useCallback, useEffect, useMemo } from 'react'
import './Header.css';
import { useBookStore, useMovieStore } from '../Store';
import { Link } from 'react-router-dom';
import _ from 'lodash';

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
  onSearch // onsearch === handleSearchChange 함수
}) => {
  const fetchSearchBooks = useBookStore(state => state.fetchSearchBooks);
  const fetchSearchMovies = useMovieStore(state => state.fetchSearchMovies);

  const debounceDelay = 200;
  const debounceFetchSearchBooks = useMemo(() => _.debounce(fetchSearchBooks, debounceDelay), [fetchSearchBooks]);
  const debounceFetchSearchMovies = useMemo(() => _.debounce(fetchSearchMovies, debounceDelay), [fetchSearchMovies]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const query:string = e.target.value;
    onSearch(query); // input 창에서 타이핑하면 onSearch 함수 실행되고, App.js에 있는 state에 저장됨 / 이 state를 BookList 컴포넌트에 전달해줌
    if (selected === 'Books') {
      debounceFetchSearchBooks(query);
    } else {
      debounceFetchSearchMovies(query);
    }
  }, [onSearch, selected, debounceFetchSearchBooks, debounceFetchSearchMovies])

  useEffect(() => {
    return () => {
      debounceFetchSearchBooks.cancel();
      debounceFetchSearchMovies.cancel();
    }
  }, [debounceFetchSearchBooks, debounceFetchSearchMovies]);
  

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