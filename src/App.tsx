import './App.css';
import Header from './components/Header';
import BookList from './components/book-components/BookList';
import { useState } from 'react';
import Footer from './components/Footer';
import MovieList from './components/movie-components/MovieList';
import { useBookStore, useMovieStore } from './Store';


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
      <div className='inner' style={{ marginTop: 100 }}>
        {selected === 'Books' ? 
          (<BookList 
            searchQuery={searchQuery}
          />) :
          (<MovieList
            searchQuery={searchQuery}
          />)
        }
      </div>
      <Footer/>
    </div>
  );
}

export default App;