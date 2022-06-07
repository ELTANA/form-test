import './App.css'

function App() {
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
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='confirm-password' className='form-label'>
            Confirm Password
          </label>
          <input
            type='password'
            name='confirm-password'
            id='confirm-password'
            className='form-control'
          />
        </div>
      </form>
    </div>
  )
}

export default App
