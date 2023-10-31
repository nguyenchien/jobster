import React from 'react'
import { useEffect } from 'react'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import { useSelector, useDispatch } from 'react-redux'
import Loading from './Loading'

const JobsContainer = () => {
  const {jobs, isLoading} = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();
  
  if (isLoading) {
    return (
      <Loading center />
    )
  }
  
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs to display...</h2>
      </Wrapper>
    )
  }
  
  return (
    <Wrapper>
      <h5>jobs info</h5>
      <div className="jobs">
        {jobs.map((job, index) => {
          return <Job key={index} {...job} />
        })}
      </div>
    </Wrapper>
  )
}

export default JobsContainer