import './App.css';
import { Suspense, useState } from 'react';
import { useBookStore, useMovieStore } from './Store';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import React from 'react';
import Footer from './components/Footer';

const BookList = React.memo(React.lazy(() => import('./components/book-components/BookList')));
const MovieList = React.memo(React.lazy(() => import('./components/movie-components/MovieList')));


const App:React.FC = () => {
  const [selected, setSelected] = useState<string>('Books'); // 헤더에서 li 선택 시 focus 효과를 주기 위한 state
  const [searchQuery, setSearchQuery] = useState<string>(''); // 헤더에 있는 input 태그의 값 옵저버 state

  const { setFilteredBooks } = useBookStore(); // 책 리스트 및 검색 시 출력되는 책 리스트
  const { setFilteredMovies } = useMovieStore(); // 영화 리스트 및 검색 시 출력되는 영화 리스트

  const handleClick = (li:string):void => { 
    setSelected(li);
    setSearchQuery('');
    setFilteredBooks([]);
    setFilteredMovies([]);
  }

  const handleSearchChange = (q: string): void => { // input 값 옵저버 함수
    setSearchQuery(q);
  }

  return (
    <div className="App"> 
    <Header 
      selected={selected} 
      handleClick={handleClick}
      searchQuery={searchQuery} 
      onSearch={handleSearchChange} 
    />
    <Suspense fallback={<div>Loading List..</div>}>
      <div className='inner' style={{ marginTop: 100 }}>
        <Routes>
          <Route path="/" element={<BookList searchQuery={searchQuery}/>}/>
          <Route path="/movies" element={<MovieList searchQuery={searchQuery}/>} />
        </Routes>
      </div>
    </Suspense>
    <Footer/>
    </div>
  );
}

export default App;