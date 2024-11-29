import React from 'react'
import styled from 'styled-components'

const Modal = ({ book, setModal, modal }) => {
  const bookCover = book.cover.replace("cover200", "cover500");
  return (
    <Container className={modal ? 'show' : ''}>
      <Inner>
        <Image 
          src={bookCover}
          alt={book.title}
        />
        <Wrap>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '30px', width: '90%'}}>{book.title}</h2>
          <Des style={{ fontSize: '1.2rem', marginBottom: '30px'}}>작가: {book.author}</Des>
          <Des>ISBN: {book.isbn}</Des>
          <Des>카테고리: {book.categoryName}</Des>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '20px'}}>책 소개</h3>
          <Des style={{ letterSpacing: '1.1px'}}>{book.description}</Des>
          <Button>구매하기</Button>
        </Wrap>
        <Close onClick={() => setModal(false)}></Close>
      </Inner>
    </Container>
  )
}

export default Modal

const Container = styled.div `
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  z-index: 1000;
  animation: fadeIn 0.4s ease-in-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      visibility: hidden;
    }
    100% {
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, -50%);
    }
  }
`

const Inner = styled.div `
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`
const Wrap = styled.div `
  padding: 1rem 1.25rem;
  width: 90%;
`

const Des = styled.p `
  font-family: 'Malgun Gothic', sans-serif;
  font-size: 16px;
  color: #333;
  margin-bottom: 25px;
`
const Image = styled.img `
  width: 100%;
`

const Close = styled.div ` 
  width: 40px; height: 40px;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute; 
  top: 10px; right: 10px;
  cursor: pointer;

  &:hover {
    background-color: #fafafa;
    border-radius: 50%;
  }
  &::before, &::after {
    content: "";
    position: absolute;
    background-color: #000;
    width: 20px; height: 2px;
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`
const Button = styled.button `
  width: 100%;
  border: none;
  border-radius: 10px;
  padding: 1rem;
  background-color: rgb(37, 99, 235);
  color: #fff;
  text-align: center;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #1d4ed8;
  }
`