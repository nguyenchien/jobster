import React from 'react'
import {FaLocationArrow, FaBriefcase, FaCalendarAlt} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'

const Job = ({
  _id,
  company,
  position,
  status,
  createdAt,
  jobLocation,
  jobType,
}) => {
  const date = createdAt;
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow/>} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt/>} text={date} />
          <JobInfo icon={<FaBriefcase/>} text={jobType} />
          <p className={`status ${status}`}>{status}</p>
        </div>
      </div>
      <footer>
        <div className="actions">
          <Link
            to='/add-job'
            className='btn edit-btn'
            onClick={()=>console.log('edit job')}
          >
            Edit
          </Link>
          <button
            className='btn delete-btn'
            onClick={()=>console.log('delete job')}
          >
            Delete
          </button>
        </div>
      </footer>
    </Wrapper>
  )
}

export default Job