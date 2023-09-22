import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: false,
};

const Register = () => {  
  const [values, setValues] = useState(initialState);
  const {user, isLoading} = useSelector(store => store.user);
  const dispath = useDispatch();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({
      ...values,
      [name]: value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if ( !email || !password || (!name && !isMember) ) {
      toast.error("Please enter all fields");
      return;
    }
    if (isMember) {
      dispath(loginUser({ email: email, password: password}));
      return;
    }
    dispath(registerUser({ name, email, password }));
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
        
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
        
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