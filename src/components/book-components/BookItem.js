import React, { useState } from 'react'
import styled from 'styled-components';
import './BookItem.css';
import Modal from '../Modal';

const BookItem = ({ book }) => {
  const [modal, setModal] = useState(false);

  const handleClick = () => {
    setModal(prev => !prev);
  }

  return (
    <div>
      <Item>
        <Image 
          src={book.cover}
          alt={book.title}
          onClick={() => handleClick()}
        />
        <Info>
          <h3>{book.title.length > 20 ? book.title.slice(0, 20) + "..." : book.title}</h3>
          <p>{book.author}</p>
        </Info>
      </Item>
      {modal && 
        <Modal 
          book={book}
          setModal={setModal}
          modal={modal}
        />
      }
      {modal && <Shadow onClick={handleClick}/>}
    </div>
  )
}

export default BookItem;

const Item = styled.div `
  max-width: 400px;
  height: min-content;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  transition: all .1s ease;
  background-color: #fff;

  &:hover {
    transform: scale(1.1);
    z-index: 2;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
  }

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`

const Image = styled.img `
  width: 100%;
  height: 285px;
  object-fit: contain;
`

const Info = styled.div `
  padding: 0 1rem;
`

const Shadow = styled.div `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, .2);
  z-index: 4;
`