import './App.css';
import { Suspense, useCallback, useState } from 'react';
import { useBookStore, useMovieStore } from './Store';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import React from 'react';
import Footer from './components/Footer';

// react.lazy로 컴포넌트 동적 로딩
const BookList = React.memo(React.lazy(() => import('./components/book-components/BookList')));
const MovieList = React.memo(React.lazy(() => import('./components/movie-components/MovieList')));


const App:React.FC = () => {
  const [selected, setSelected] = useState<string>('Books'); // 헤더에서 li 선택 시 focus 효과를 주기 위한 state
  const [searchQuery, setSearchQuery] = useState<string>(''); // 헤더에 있는 input 태그의 값 옵저버 state

  const { setFilteredBooks } = useBookStore(); // 책 리스트 및 검색 시 출력되는 책 리스트
  const { setFilteredMovies } = useMovieStore(); // 영화 리스트 및 검색 시 출력되는 영화 리스트

  // usecallback으로 함수 재생성 방지 (자식 컴포넌트에 props로 전달했기 때문에 최적화를 위해 사용함)
  const handleClick = useCallback((li:string):void => { // li 클릭 시 일어나는 이벤트 제어
    setSelected(li);
    setSearchQuery('');
    setFilteredBooks([]);
    setFilteredMovies([]);
  }, [setSelected ,setFilteredBooks, setFilteredMovies]);

  const handleSearchChange = useCallback((q: string): void => { // input 값 옵저버 함수
    setSearchQuery(q);
  }, [setSearchQuery]);

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