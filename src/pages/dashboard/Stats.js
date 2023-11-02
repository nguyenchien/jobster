import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { showStats } from '../../features/allJobs/allJobsSlice'

const Stats = () => {
  const dispath = useDispatch();
  
  useEffect(() => {
    dispath(showStats());
  }, []);
  
  return (
    <h1>Status</h1>
  )
}

export default Stats