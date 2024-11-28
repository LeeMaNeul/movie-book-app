import React from 'react'
import styled from 'styled-components'

const Modal = ({ book }) => {
  const a = book.cover.replace("cover200", "cover500");
  console.log(a);
  return (
    <Container>
      <Inner>
        <img 
          src={book.cover}
          alt={book.title}
        />
      </Inner>
    </Container>
  )
}

export default Modal

const Container = styled.div `
  width: 35vw;
  height: 80vh;
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  transition: .6s all ease-in-out;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  z-index: 1000;
`

const Inner = styled.div `
  width: 80%;
  margin: auto;
  background-color: red;
`