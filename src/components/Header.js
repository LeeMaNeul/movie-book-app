import React from 'react'
import './Header.css';

const Header = () => {
  return (
    <header>
      <div className='inner'>
          <a href='/' className='logo'>Book & Moov</a>
          <ul className='links'>
            <li className='link active'><a href="javascript:void(0)">Books</a></li>
            <li className='link'><a href="javascript:void(0)">Movies</a></li>
            <li className='link'><a href="javascript:void(0)">About</a></li>
          </ul>
          <div className='search-wrapper'>
            <input 
              type='text'
              placeholder='Search...'
            />
            <i className="fa-solid fa-magnifying-glass search"></i>
          </div>
        </div>
    </header>
  )
}

export default Header