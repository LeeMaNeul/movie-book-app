import React from 'react'
import styled from 'styled-components';
import './BookItem.css';

const BookItem = () => {
  return (
    <Item>
      <img 
        src='https://cdn.pixabay.com/photo/2023/03/10/17/52/prayer-book-7842864_640.jpg'
        alt='book'
        className='bookImage'
      />
      <Info>
        <h3>title</h3>
        <p>author</p>
        <p>rate</p>
      </Info>
    </Item>
  )
}

export default BookItem;

const Item = styled.div `
  margin-top: 25px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`

const Info = styled.div `
  padding: 0 1rem;
`