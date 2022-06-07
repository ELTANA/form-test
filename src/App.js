import { useState } from 'react'
import validator from 'validator'
import './App.css'

function App() {
  const [signUpInput, setSignUpInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = e => {
    setSignUpInput({
      ...signUpInput,
      [e.target.name]: e.target.value,
    })
  }

  const [error, setError] = useState(null)

  const handlClick = e => {
    e.preventDefault()

    if (!validator.isEmail(signUpInput.email)) {
      return setError('The Email is invalid!')
    } else if (signUpInput.password.length < 5) {
      setError('The Password should contain at least 5 Characters!')
    } else if (signUpInput.password !== signUpInput.confirmPassword) {
      setError('The Passwords do not match!')
    }
  }

  return (
    <div className='container my-5'>
      <form>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email Address
          </label>
          <input
            type='email'
            name='email'
            id='email'
            className='form-control'
            value={signUpInput.email}
            onChange={handleChange}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            className='form-control'
            value={signUpInput.password}
            onChange={handleChange}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='confirmPassword' className='form-label'>
            Confirm Password
          </label>
          <input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            className='form-control'
            value={signUpInput.confirmPassword}
            onChange={handleChange}
          />
        </div>

        {error && (
          <div className='text-danger mb-3'>
            <small>{error}</small>
          </div>
        )}

        <button type='submit' className='btn btn-primary' onClick={handlClick}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default App
