import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import BookItem from './BookItem'
import axiosList from '../../api/axiosList';
 
const BookList = ({ searchQuery, filteredBooks }) => {
  // 책 리스트 가져오기
  const [bestsellers, setBestsellers] = useState([]); 
  const [newbooks, setNewbooks] = useState([]);
  const [specialbooks, setSpecialbooks] = useState([]);

  const isNoResults = searchQuery && filteredBooks.length === 0; // input 입력은 했으나 검색 결과가 없는 경우
    
  const fetchData = useCallback(async (QueryType) => { // api 데이터 가져옴
    try {
      const cachedData = localStorage.getItem(QueryType);
      if (cachedData) return JSON.parse(cachedData);

      const res = await axiosList.get('https://cors-anywhere.herokuapp.com/http://www.aladin.co.kr/ttb/api/ItemList.aspx', {
        params: {
          QueryType
        }
      });
      const data = res.data.item;      
      localStorage.setItem(QueryType, JSON.stringify(data));
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

      setBestsellers(bestsellersData); // 각 리스트들 state에 저장
      setNewbooks(newBooksData);
      setSpecialbooks(specialBooksData);
    } catch (err) {
      console.log("데이터 가져오기 오류 : ", err);
    }
  }, [fetchData]); // API에 변화가 있을 때마다 실행

  useEffect(() => { // API 데이터를 가져온 뒤 불필요한 렌더링 방지를 위해 useEffect 사용
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div>
      {isNoResults ? 
        (<>
          <Category className='not-found'>"{searchQuery}" 검색 결과가 없습니다.</Category>       
        </>) :
        (<>
          {filteredBooks.length > 0 ? // 검색했을 때 결과가 있으면
            (<>
              <Category>"{searchQuery}" 검색 결과</Category>
              <Wrapper>
                {filteredBooks.map(book => ( // 검색 결과를 출력
                  <BookItem key={book.itemId} book={book} />
                ))}
              </Wrapper>
            </>) :
            (<>
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
            </>)
          }
        </>)
      }
    </div>
  )
}

export default BookList

const Category = styled.h2 `
  &.not-found {
    text-align: center;
    margin-top: 40px;
  }
`

const Wrapper = styled.div `
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    display: block;
  }
`

