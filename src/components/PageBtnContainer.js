import React from 'react'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useSelector, useDispatch } from 'react-redux';

const PageBtnContainer = () => {
  const dispatch = useDispatch();
  
  const { numOfPages, page } = useSelector((store) => store.allJobs);
  
  const pages = Array.from({length: numOfPages}, (_, index) => {
    return index + 1;
  });

  const prevPage = () => {
    console.log('prev page');
  };
  
  const nextPage = () => {
    console.log('next page');
  };
  
  return (
    <Wrapper>
      <button className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber, index) => {
          return (
            <button
              type='button'
              key={pageNumber}
              className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
              onClick={() => console.log('change page')}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className='next-btn' onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button> 
    </Wrapper>
  )
}

export default PageBtnContainer