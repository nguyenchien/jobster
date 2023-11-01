import React from 'react';
import { FormRow, FormRowSelect } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { handleChange, handleClearValue, createJob } from '../../features/job/jobSlice';
import { useEffect } from 'react';
import { getUserFromLocalStorage } from '../../utils/localStorage';

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    isEditing,
    editJobId,
  } = useSelector(store => store.job);
  
  const { user } = useSelector(store => store.user)
  
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error('Please fill out all the fields!');
      return;
    }
    dispatch(createJob({position, company, jobLocation, status, jobType}));
  }
  
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({name, value}));
  }
  
  const handleClearInput = () => {
    dispatch(handleClearValue());
  }
  
  useEffect (()=>{
    if (!isEditing) {
      dispatch(handleChange({name: 'jobLocation', value: user.location}));
    }
  }, []);
  
  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        <div className="form-center">
          {/* position */}
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />
          
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          
          {/* jobLocation */}
          <FormRow
            type='text'
            name='jobLocation'
            labelText='job location'
            value={jobLocation}
            handleChange={handleJobInput}
          />
          
          {/* status */}
          <FormRowSelect
            name='status'
            value={status}
            list={statusOptions}
            handleChange={handleJobInput}
          />
          
          {/* jobType */}
          <FormRowSelect
            name='jobType'
            labelText='job type'
            value={jobType}
            list={jobTypeOptions}
            handleChange={handleJobInput}
          />
          
          <div className="btn-container">
            <button
              type='button'
              className='btn btn-block clear-btn'
              onClick={handleClearInput}
            >
              clear
            </button>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled = {isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob