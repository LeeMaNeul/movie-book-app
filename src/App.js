import './App.css';
import Header from './components/Header';
import BookItem from './components/BookItem';
import BookList from './components/BookList';
import { useState } from 'react';
import styled from 'styled-components';

// http://www.omdbapi.com/?i=tt3896198&apikey={apiKey}

function App() {
  const [selected, setSelected] = useState('Books');

  const handleClick = li => {
    setSelected(li);
  }

  return (
    <div className="App"> 
      <Header selected={selected} handleClick={handleClick}/>
      <div className='inner'>
        <BookList />
      </div>
    </div>
  );
}

export default App;