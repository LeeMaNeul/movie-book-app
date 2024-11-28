import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import BookItem from './BookItem'
import axios from '../api/axios';
import Modal from './Modal';

const BookList = () => {
  const [bestsellers, setBestsellers] = useState([]);
  const [newbooks, setNewbooks] = useState([]);
  const [specialbooks, setSpecialbooks] = useState([]);
  
  // const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  
  const fetchData = useCallback(async (queryType) => { // api 데이터 가져옴
    try {
      const res = await axios.get('https://cors-anywhere.herokuapp.com/http://www.aladin.co.kr/ttb/api/ItemList.aspx', {
        params: {
          QueryType: queryType
        }
      });
      console.log(res.data.item);
      return res.data.item;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetch = useCallback(async () => { // 데이터 가져와서 state값 설정
    try {
      const bestsellersData = await fetchData('Bestseller');
      const newBooksData = await fetchData('ItemNewAll');
      const specialBooksData = await fetchData('ItemNewSpecial');

      setBestsellers(bestsellersData);
      setNewbooks(newBooksData);
      setSpecialbooks(specialBooksData);
    } catch (err) {
      console.log("데이터 가져오기 오류 : ", err);
    }
  }, [fetchData]);

  useEffect(() => {
    fetch();
  }, [fetch]);


  return (
    <div>
      <Category>Best Sellers</Category>
      <Wrapper>
        {bestsellers.map((book) => (
          <BookItem key={book.itemId} book={book} />
        ))}
      </Wrapper>
      <Category>New Special Books</Category>
      <Wrapper>
        {specialbooks.map((book) => (
          <BookItem key={book.itemId} book={book} />
        ))}
      </Wrapper>
      <Category>New Books</Category>
      <Wrapper>
        {newbooks.map((book) => (
          <BookItem key={book.itemId} book={book} />
        ))}
      </Wrapper>
    </div>
  )
}

export default BookList

const Category = styled.h2 `

`

const Wrapper = styled.div `
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
`

