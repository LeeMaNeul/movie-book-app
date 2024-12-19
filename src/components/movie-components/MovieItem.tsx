import React, { useState } from 'react'
import styled from 'styled-components';
import Modal from '../Modal';
import { Movie, Person } from '../../Movie';

interface props {
  movie: Movie;
  backdropUrl: string;
  cast?: {
    crew?: Person;
  };
}

const MovieItem:React.FC<props> = ({ movie, backdropUrl, cast }) => {
  const [modal, setModal] = useState<boolean>(false);
  const handleClick = () => {
    setModal(prev => !prev);
  }


  return (
    <div>
      <Item>
        <Image 
          src={backdropUrl}
          alt={movie.title}
          onClick={handleClick}
        />
        <Info>
          <h3>{(movie.title.length > 20 ? movie.title.slice(0, 25) + "..." : movie.title)}</h3>
          <p>{cast?.crew?.name}</p>
        </Info>
      </Item>
      {modal && 
        <Modal 
          movie={movie}
          setModal={setModal}
          modal={modal}
          cast={cast}
        />
      }
      {modal && <Shadow onClick={handleClick}/>}
    </div>
  )
}

export default MovieItem;

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
`

const Image = styled.img `
  width: 100%;
  height: min-content;
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