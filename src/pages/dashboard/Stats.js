import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Loading, StatsContainer, ChartsContainer} from '../../components'
import { showStats } from '../../features/allJobs/allJobsSlice'

const Stats = () => {
  const dispath = useDispatch();
  
  const {
    isLoading,
    stats,
    monthlyApplications,
  } = useSelector((store) => store.allJobs);
  
  useEffect(() => {
    dispath(showStats());
  }, []);
  
  return (
    <>
      <StatsContainer/>
      {monthlyApplications.length > 0 && <ChartsContainer/>}
    </>
  )
}

export default Stats