  import './App.css';
import Header from './components/Header';
import BookList from './components/book-components/BookList';
import { useState } from 'react';
import Footer from './components/Footer';
import MovieList from './components/movie-components/MovieList';
import { Book } from './Book';
import { Movie } from './Movie';

const App:React.FC = () => {
  const [selected, setSelected] = useState<string>('Books'); // 헤더에서 li 선택 시 focus 효과를 주기 위한 state
  const [searchQuery, setSearchQuery] = useState<string>(''); // 헤더에 있는 input 태그의 값 옵저버 state
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]); // 검색 시 필터링된 책 목록을 저장하는 state
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]); // 검색 시 필터링된 영화 목록을 저장하는 state

  const handleClick = (li:string):void => { // li focus 함수
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
        setFilteredBooks={setFilteredBooks} 
        setFilteredMovies={setFilteredMovies}
      />
      <div className='inner' style={{ marginTop: 100 }}>
        {selected === 'Books' ? 
          (<BookList 
            searchQuery={searchQuery}
            filteredBooks={filteredBooks} 
          />) :
          (<MovieList
            searchQuery={searchQuery}
            filteredMovies={filteredMovies}
          />)
        }
      </div>
      <Footer/>
    </div>
  );
}

export default App;