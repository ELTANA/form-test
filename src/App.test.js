import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('Test Form Inputs', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<App />)
  })

  test('Email Input value should be empty on initial render', () => {
    const emailInputElement = screen.getByRole('textbox')
    expect(emailInputElement.value).toBe('')
  })

  test('Password Input value should be empty on initial render', () => {
    const passwordInputElement = screen.getByLabelText('Password')
    expect(passwordInputElement.value).toBe('')
  })

  test('Confirm Password Input value should be empty on initial render', () => {
    const confirmPasswordInputElement =
      screen.getByLabelText(/confirm password/i)
    expect(confirmPasswordInputElement.value).toBe('')
  })

  test('Should be able to type an Email into the Input', () => {
    const emailInputElement = screen.getByRole('textbox', {
      name: /email/i,
    })
    userEvent.type(emailInputElement, 'eltana@eltana.dev')
    expect(emailInputElement.value).toBe('eltana@eltana.dev')
  })

  test('Should be able to type a Password into the Input', () => {
    const passwordInputElement = screen.getByLabelText('Password')
    userEvent.type(passwordInputElement, 's3cret')
    expect(passwordInputElement.value).toBe('s3cret')
  })

  test('Should be able to type a Confirm Password into the Input', () => {
    const confirmPasswordInputElement =
      screen.getByLabelText(/confirm password/i)
    userEvent.type(confirmPasswordInputElement, 's3cret')
    expect(confirmPasswordInputElement.value).toBe('s3cret')
  })

  test('Should show email error when Invalid email is Typed', () => {
    const emailErrorElement = screen.queryByText(/The Email is invalid!/i)
    const emailInputElement = screen.getByRole('textbox', {
      name: /email/i,
    })
    const submitBtnElement = screen.getByRole('button', {
      name: /submit/i,
    })

    expect(emailErrorElement).not.toBeInTheDocument()

    // Wrong EMail Test
    userEvent.type(emailInputElement, 'eltanaeltana.dev')
    userEvent.click(submitBtnElement)

    const emailErrorElementTwo = screen.queryByText(/The Email is invalid!/i)

    expect(emailErrorElementTwo).toBeInTheDocument()
  })

  test('Should Show Password Error if Password is less than 5 Characters', () => {
    const emailInputElement = screen.getByRole('textbox', {
      name: /email/i,
    })
    const passwordInputElement = screen.getByLabelText('Password')
    const passwordErrorElement = screen.queryByText(
      /The Password should contain at least 5 Characters!/i
    )
    const submitBtnElement = screen.getByRole('button', {
      name: /submit/i,
    })

    userEvent.type(emailInputElement, 'eltana@eltana.dev')
    expect(passwordErrorElement).not.toBeInTheDocument()

    userEvent.type(passwordInputElement, '123')
    userEvent.click(submitBtnElement)

    const passwordErrorElementTwo = screen.queryByText(
      /The Password should contain at least 5 Characters!/i
    )

    expect(passwordErrorElementTwo).toBeInTheDocument()
  })

  test('Should Show Confirm Password does not Match Password', () => {
    const emailInputElement = screen.getByRole('textbox', {
      name: /email/i,
    })
    const passwordInputElement = screen.getByLabelText('Password')
    const confirmPasswordErrorElement = screen.queryByText(
      /The Passwords do not match!/i
    )
    const confirmPasswordInputElement =
      screen.getByLabelText(/confirm password/i)

    const submitBtnElement = screen.getByRole('button', {
      name: /submit/i,
    })
    userEvent.click(submitBtnElement)

    userEvent.type(emailInputElement, 'eltana@eltana.dev')
    userEvent.type(passwordInputElement, 's3cret')

    expect(confirmPasswordErrorElement).not.toBeInTheDocument()

    // WRONG PASSWORD
    userEvent.type(confirmPasswordInputElement, '12345')

    userEvent.click(submitBtnElement)

    const confirmPasswordErrorElementTwo = screen.queryByText(
      /The Passwords do not match!/i
    )

    expect(confirmPasswordErrorElementTwo).toBeInTheDocument()
  })

  test('Should Show No Error if Password If all Input Fields are Valid', () => {
    const emailInputElement = screen.getByRole('textbox', {
      name: /email/i,
    })
    const passwordInputElement = screen.getByLabelText('Password')
    const confirmPasswordInputElement =
      screen.getByLabelText(/confirm password/i)
    const submitBtnElement = screen.getByRole('button', {
      name: /submit/i,
    })

    userEvent.type(emailInputElement, 'eltana@eltana.dev')
    userEvent.type(passwordInputElement, 's3cret')
    userEvent.type(confirmPasswordInputElement, 's3cret')

    userEvent.click(submitBtnElement)

    const emailErrorElement = screen.queryByText(/The Email is invalid!/i)
    const passwordErrorElement = screen.queryByText(
      /The Password should contain at least 5 Characters!/i
    )
    const confirmPasswordErrorElementTwo = screen.queryByText(
      /The Passwords do not match!/i
    )

    // expect(emailErrorElement).not.toBeInTheDocument()
    // expect(passwordErrorElement).not.toBeInTheDocument()
    // expect(confirmPasswordErrorElementTwo).not.toBeInTheDocument()
    expect(
      emailErrorElement ||
        passwordErrorElement ||
        confirmPasswordErrorElementTwo
    ).not.toBeInTheDocument()
  })
})
