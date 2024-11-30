  import './App.css';
import Header from './components/Header';
import BookList from './components/BookList';
import { useState } from 'react';
import Footer from './components/Footer';

// http://www.omdbapi.com/?i=tt3896198&apikey={apiKey}

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
      <div className='inner'>
        <BookList searchQuery={searchQuery} filteredBooks={filteredBooks}/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;