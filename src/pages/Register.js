import { useState, useEffect } from 'react';
import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';

const Register = () => {
  
  const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: false,
  };
  
  const [values, setValues] = useState(initialState);
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({
      ...values,
      [name]: value
    });
    console.log(values);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if ( !email || !password || (!name && !isMember) ) {
      alert("Please enter all fields");
      return;
    }
    console.log(values);
  };
  
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        
        {/* name field */}
        {!values.isMember && <FormRow 
          type='text'
          name='name'
          value={values.name}
          handleChange={handleChange}
          labelText='Name'
        />}
        
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
        
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}

          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register