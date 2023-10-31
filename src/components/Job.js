import React from 'react'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Job'

const Job = ({
  _id,
  company,
  position,
  status,
}) => {
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
          <h4>more content</h4>
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