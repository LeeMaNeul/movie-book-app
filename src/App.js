  import './App.css';
import Header from './components/Header';
import BookList from './components/book-components/BookList';
import { useState } from 'react';
import Footer from './components/Footer';
import MovieList from './components/movie-components/MovieList';

function App() {
  const [selected, setSelected] = useState('Books');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  const handleClick = li => {
    setSelected(li);
  }

  const handleSearchChange = q => {
    setSearchQuery(q);
  }

  return (
    <div className="App"> 
      <Header selected={selected} handleClick={handleClick} searchQuery={searchQuery} onSearch={handleSearchChange} setFilteredBooks={setFilteredBooks} />
      <div className='inner' style={{ marginTop: 100 }}>
        {selected === 'Books' ? 
          (<BookList searchQuery={searchQuery} filteredBooks={filteredBooks} />) :
          (<MovieList />)
        }
      </div>
      <Footer/>
    </div>
  );
}

export default App;