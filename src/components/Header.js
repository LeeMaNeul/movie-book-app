import React from 'react'
import './Header.css';

const Header = ({ handleClick, selected }) => {
  return (
    <header>
      <div className='inner'>
          <a href='/' className='logo'>Moovle</a>
          <ul className='links'>
            <li className={`link ${selected === 'Books' ? 'active' : ''}`}><a href="javascript:void(0)" onClick={() => handleClick('Books')}>Books</a></li>
            <li className={`link ${selected === 'Movies' ? 'active' : ''}`}><a href="javascript:void(0)" onClick={() => handleClick('Movies')}>Movies</a></li>
            <li className={`link ${selected === 'About' ? 'active' : ''}`}><a href="javascript:void(0)" onClick={() => handleClick('About')}>About</a></li>
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