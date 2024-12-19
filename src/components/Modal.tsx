import React from 'react';
import styled from 'styled-components';
import star from '../images/star.png';
import { Book } from '../Book';
import { Movie, Person } from '../Movie';

interface props {
  book?: Book | null;
  movie?: Movie | null;
  cast?: {
    cast?: Person[] | null;
    crew?: Person | null;
  }
  modal: boolean;
  setModal: (props: boolean) => void;
}

const Modal:React.FC<props> = ({ cast, modal, setModal, book, movie }) => {
  const cover:string = book ? book.cover.replace("cover200", "cover500") || "" : `https://image.tmdb.org/t/p/w1280/${movie?.poster_path}`;
  const title:string = book ? (book as Book).title : (movie as Movie).title;
  const date = new Date(movie?.release_date as string);
  const character:string = book ? book.author : cast?.crew?.name as string;
  const etc = 
    book 
      ? `ISBN: ${book.isbn}` 
      : `개봉일: ${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  const rating = book ? (book?.customerReviewRank as number / 2).toFixed(1) : (movie?.vote_average as number/ 2).toFixed(1)
  const description:string = book ? book.description : movie?.overview as string;

  return (
    <Container className={modal ? 'show' : ''}>
      <Inner>
        <Image 
          src={cover}
          alt={title}
        />
        <Wrap>
          <h2 style={{ fontSize: '1.5em', marginBottom: '30px', width: '90%'}}>{title}</h2>
          <Des style={{ fontSize: '1.2em', marginBottom: '30px'}}>{book ? "작가:" : "감독: "} {character}</Des>
          {(movie) && cast && <Des>출연진: {cast?.cast?.map(cast => cast.name).join(', ')}</Des>}
          <Des>{etc}</Des>
          <Des className='rating'>
            <img 
              src={star}
              alt='star'
              style={{ width: 25, height: 25}}
            />
            {rating}
          </Des>
          {book && <Des>카테고리: {book.categoryName}</Des>}
          <h3 style={{ fontSize: '1.3em', marginBottom: '20px'}}>{book ? "책 소개" : "영화 소개"}</h3>
          <Des className='description'>{description}</Des>
          <Button>{book ? "구매하기" : "예매하기"}</Button>
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
  overflow: hidden;
  min-width: 800px;

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

  @media (max-width: 1280px) {
    font-size: 0.9rem;
  }
`

const Inner = styled.div `
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`
const Wrap = styled.div `
  padding: 1em 1.25em;
  width: 90%;
`

const Des = styled.p `
  font-family: 'Malgun Gothic', sans-serif;
  font-size: 1em;
  color: #333;
  margin-bottom: 25px;

  &.rating {
    display: flex;
    gap: 10px;
    font-weight: 600;
    font-size: 1.2em;
  }

  &.description {
    letter-spacing: 1.1px;
  }

  @media (max-width: 1280px) {
    &.description {
      letter-spacing: 0;
    }
  }
`
const Image = styled.img `
  width: 100%;
  object-fit: cover;
`

const Close = styled.div ` 
  width: 40px; height: 40px;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute; 
  top: 30px; right: 10px;
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
  padding: 1em;
  background-color: rgb(37, 99, 235);
  color: #fff;
  text-align: center;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background-color: #1d4ed8;
  }
`