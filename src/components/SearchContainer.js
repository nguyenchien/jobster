import React, { useState, useMemo } from 'react'
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
  
  const [localSearch, setLocalSearch] = useState('');
  
  const dispatch = useDispatch();
  
  const handleSearch = (e) => {
    dispatch(handleChange({name: e.target.name, value: e.target.value}));
  }
  
  const debounce = () => {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(()=>{
        dispatch(handleChange({name: e.target.name, value: e.target.value}));
      }, 1000);
    }
  }
  
  const optimizedDebounce = useMemo(() => debounce(), []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
    setLocalSearch('');
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
            value={localSearch}
            handleChange={optimizedDebounce}
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