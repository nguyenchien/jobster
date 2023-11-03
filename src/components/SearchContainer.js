import React from 'react'
import Wrapper from '../assets/wrappers/SearchContainer';
import { useSelector, useDispatch } from 'react-redux';
import { FormRow, FormRowSelect } from '../components'
import { handleChange, clearFilters } from '../features/allJobs/allJobsSlice';

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
  } = useSelector((store) => store.allJobs);
  
  const {
    jobTypeOptions,
    statusOptions,
  } = useSelector((store) => store.job);
  
  const dispatch = useDispatch();
  
  const handleSearch = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({name, value}));
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
  }
  
  return (
    <Wrapper>
      <h4>form search</h4>
      <form className="form">
        <div className="form-center">
          {/* search by position */}
          <FormRow
            type='text'
            name='search'
            value={search}
            handleChange={handleSearch}
          />
          {/* search by status */}
          <FormRowSelect
            labelText='status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />
          {/* search by type */}
          <FormRowSelect
            labelText='type'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            labelText='sort'
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          {/* buttoon */}
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear fillter
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer