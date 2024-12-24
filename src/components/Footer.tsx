import React from 'react'
import './Footer.css';
import styled from 'styled-components';
import email from '../images/email.png';
import twitter from '../images/twitter.png';
import facebook from '../images/facebook.png';
import instagram from '../images/instagram.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';


const Footer:React.FC = React.memo(() => {
  // console.log('Footer is rendering!');
  return (
    <footer>
      <div className='inner'>
        <Wrap>
          <Des>Book & Moov</Des>
          <p className='copyright'>&copy; 2024 Book&Moov. All rights reserved.</p>
        </Wrap>
        <Wrap>
          <Des>Follow Us</Des>
          <div className='icons'>
            <LazyLoadImage 
              src={facebook}
              alt='facebook'
            />
            <LazyLoadImage 
              src={twitter}
              alt='twitter'
            />
            <LazyLoadImage 
              src={instagram}
              alt='instagram'
            />
          </div>
        </Wrap>
        <Wrap>
          <Des>Contact</Des>
          <div className='email'>
            <LazyLoadImage 
              src={email}
              alt='email'
              className='emailImage'
            />
            <p>contact@gmail.com</p>
          </div>
        </Wrap>
      </div>
    </footer>
  )
})

export default Footer

const Des = styled.h3 `
  
`

const Wrap = styled.div `
  margin-top: 20px;
`