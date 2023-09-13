import { useState, useEffect } from 'react';
import { Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';

const Register = () => {
  
  const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
  };
  
  const [values, setValues] = useState(initialState);
  
  const handleChange = (e) => {
    setValues(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };
  
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>Login</h3>
        
        <div className='form-row'>
          <label htmlFor='name' className='form-label'>
            name
          </label>
          <input
            type='text'
            value={values.name || undefined}
            name='name'
            onChange={handleChange}
            className='form-input'
          />
        </div>
        
        <button type='submit' className='btn btn-block'>
          submit
        </button>
      </form>
    </Wrapper>
  )
}

export default Register