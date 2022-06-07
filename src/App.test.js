import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Test Form Inputs', () => {
  test('Email Input value should be empty on initial render', () => {
    render(<App />)
    const emailInputElement = screen.getByRole('textbox')
    expect(emailInputElement.value).toBe('')
  })

  test('Password Input value should be empty on initial render', () => {
    render(<App />)
    const passwordInputElement = screen.getByLabelText('Password')
    expect(passwordInputElement.value).toBe('')
  })

  test('Confirm Password Input value should be empty on initial render', () => {
    render(<App />)
    const confirmPasswordInputElement =
      screen.getByLabelText(/confirm password/i)
    expect(confirmPasswordInputElement.value).toBe('')
  })

  test('Should be able to type an Email into the Input', () => {
    render(<App />)
    const emailInputElement = screen.getByRole('textbox', {
      name: /email/i,
    })
    userEvent.type(emailInputElement, 'eltana"eltana.dev')
    expect(emailInputElement.value).toBe('eltana"eltana.dev')
  })

  test('Should be able to type a Password into the Input', () => {
    render(<App />)
    const passwordInputElement = screen.getByLabelText('Password')
    userEvent.type(passwordInputElement, 's3cret')
    expect(passwordInputElement.value).toBe('s3cret')
  })

  test('Should be able to type a Confirm Password into the Input', () => {
    render(<App />)
    const confirmPasswordInputElement =
      screen.getByLabelText(/confirm password/i)
    userEvent.type(confirmPasswordInputElement, 's3cret')
    expect(confirmPasswordInputElement.value).toBe('s3cret')
  })
})
