import './App.css';
import Header from './components/Header';
import BookItem from './components/BookItem';

// http://www.omdbapi.com/?i=tt3896198&apikey={apiKey}

function App() {
  const active = document.querySelector('header li.link');
  const list = document.querySelector('header li.link');
  console.log(list);
  // list.addEventListener('click', () => {
  //   list.classList.add('.active');
  // })


  return (
    <div className="App"> 
      <Header />
      <div className='inner'>
        <BookItem />
        <BookItem />
        <BookItem />
      </div>
    </div>
  );
}

export default App;