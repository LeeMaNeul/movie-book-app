import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { useBookStore } from '../../Store';
import _ from 'lodash';

interface props {
  searchQuery: string | null;
}

const BookItem = React.memo(React.lazy(() => import('./BookItem')));
 
const BookList:React.FC<props> = ({ searchQuery }) => {
  // 책 리스트 가져오기
  const { 
    bestSellers, setBestSellers,
    newBooks, setNewBooks,
    specialBooks, setSpecialBooks
  } = useBookStore();

  const fetchData = useBookStore(state => state.fetchBooks);
  const filteredBooks = useBookStore(state => state.books);
  

  const isNoResults = searchQuery && filteredBooks.length === 0; // input 입력은 했으나 검색 결과가 없는 경우

  // 데이터 가져와서 state값 설정
  const fetchBooks = useMemo(() => _.debounce(async () => { // 적절한 요청을 보내기 위해 디바운스 설정
    try {
      const [bestsellersData, newBooksData, specialBooksData] = await Promise.all([
        fetchData('Bestseller'),
        fetchData('ItemNewAll'),
        fetchData('ItemNewSpecial')
      ]); // 병렬로 데이터를 가져오기 위해 Promise.all 사용
      setBestSellers(bestsellersData); // 각 리스트들 state에 저장
      setNewBooks(newBooksData);
      setSpecialBooks(specialBooksData);
    } catch (err) {
      console.log("데이터 가져오기 오류 : ", err);
    }
  }, 2000), [fetchData, setBestSellers, setNewBooks, setSpecialBooks]);

  useEffect(() => { // API 데이터를 가져온 뒤 불필요한 렌더링 방지를 위해 useEffect 사용
    return () => {
      fetchBooks.cancel();
    } 
  }, [fetchBooks]); // fetchbooks가 의존성 배열에 들어가야하는 이유는 fetch Data가 useCallback 의존성 배열에 들어가있어서 fetchData만 변화가 생기면 data update가 이뤄지지 않음

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
                  <BookItem key={book.itemId as number} book={book} />
                ))}
              </Wrapper>
            </>) :
            (<>
              <Category>Best Sellers</Category>
              <Wrapper>
                {bestSellers && bestSellers.map((book) => (
                  <BookItem key={book.itemId as number} book={book} />
                ))}
              </Wrapper>
              <Category>New Special Books</Category>
              <Wrapper>
                {specialBooks && specialBooks.map((book) => (
                  <BookItem key={book.itemId as number} book={book} />
                ))}
              </Wrapper>
              <Category>New Books</Category>
              <Wrapper>
                {newBooks && newBooks.map((book) => (
                  <BookItem key={book.itemId as number} book={book} />
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

