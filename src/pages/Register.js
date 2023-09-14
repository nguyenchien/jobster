import { useState, useEffect } from 'react';
import { Logo, FormRow } from '../components';
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
    console.log(e.target);
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
        
        {/* name field */}
        <FormRow 
          type='text'
          name='name'
          value={values.name}
          handleChange={handleChange}
          labelText='Name'
        />
        
        {/* email field */}
        <FormRow 
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
          labelText='Email'
        />
        
        {/* password field */}
        <FormRow 
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
          labelText='Password'
        />
        
        <button type='submit' className='btn btn-block'>submit</button>
      </form>
    </Wrapper>
  )
}

export default Register