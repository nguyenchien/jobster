import { useState } from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import Logo from './Logo'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar, clearStore } from '../features/user/userSlice'

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(toggleSidebar());
  }
  const [showLogout, setShowLogout] = useState(false);
  
  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick = { toggle }
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          { user && <button 
            type='button' 
            className="btn"
            onClick={ () => setShowLogout(!showLogout) }
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button> }
          <div className={`dropdown ${showLogout && 'show-dropdown'}`}>
            <button 
              type="button"
              className='dropdown-btn'
              onClick={ () => dispatch(clearStore('Logging out success...')) }
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar