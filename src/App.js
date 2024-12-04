  import './App.css';
import Header from './components/Header';
import BookList from './components/book-components/BookList';
import { useState } from 'react';
import Footer from './components/Footer';
import MovieList from './components/movie-components/MovieList';

function App() {
  const [selected, setSelected] = useState('Books'); // 헤더에서 li 선택 시 focus 효과를 주기 위한 state
  const [searchQuery, setSearchQuery] = useState(''); // 헤더에 있는 input 태그의 값 옵저버 state
  const [filteredBooks, setFilteredBooks] = useState([]); // 검색 시 필터링된 책 목록을 저장하는 state
  const [filteredMovies, setFilteredMovies] = useState([]); // 검색 시 필터링된 영화 목록을 저장하는 state

  const handleClick = li => { // li focus 함수
    setSelected(li);
    setSearchQuery('');
  }

  const handleSearchChange = q => { // input 값 옵저버 함수
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