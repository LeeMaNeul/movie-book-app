import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import BookItem from './BookItem'
import axios from '../api/axios';

const BookList = () => {
  const [bestsellers, setBestsellers] = useState([]);
  const [newbooks, setNewbooks] = useState([]);
  const [specialbooks, setSpecialbooks] = useState([]);
  
  // const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  
  const fetchData = useCallback(async (queryType) => { // api 데이터 가져옴
    try {
      const cachedData = localStorage.getItem(queryType);
      if (cachedData) return JSON.parse(cachedData);

      const res = await axios.get('https://cors-anywhere.herokuapp.com/http://www.aladin.co.kr/ttb/api/ItemList.aspx', {
        params: {
          QueryType: queryType
        }
      });
      const data = res.data.item;
      
      localStorage.setItem(queryType, JSON.stringify(data));
      return data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchBooks = useCallback(async () => { // 데이터 가져와서 state값 설정
    try {
      const [bestsellersData, newBooksData, specialBooksData] = await Promise.all([
        fetchData('Bestseller'),
        fetchData('ItemNewAll'),
        fetchData('ItemNewSpecial')
      ]); // 병렬로 데이터를 가져오기 위해 Promise.all 사용

      setBestsellers(bestsellersData);
      setNewbooks(newBooksData);
      setSpecialbooks(specialBooksData);
    } catch (err) {
      console.log("데이터 가져오기 오류 : ", err);
    }
  }, [fetchData]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);


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

