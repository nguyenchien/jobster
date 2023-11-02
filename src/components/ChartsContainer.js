import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import BarChart from './BarChart'
import AreaChart from './AreaChart'
import Wrapper from '../assets/wrappers/ChartsContainer'

const ChartsContainer = () => {
  
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useSelector((store) => store.allJobs);
  
  return (
    <Wrapper>
      <h2>Monthly Applications</h2>
      <button
        type='button'
        onClick={() => setBarChart(!barChart)}
      >
        {barChart ? 'Area Chart' : 'Bar Chart test03'}
      </button>
      {barChart ? <BarChart data={data}/> : <AreaChart data={data} />}
    </Wrapper>
  )
}

export default ChartsContainer