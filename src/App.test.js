import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

const typeIntoForm = ({ email, password, confirmPassword }) => {
  // INPUT AND BUTTON VARIABLES
  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i,
  })
  const passwordInputElement = screen.getByLabelText('Password')
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i)

  if (email) {
    userEvent.type(emailInputElement, email)
  }

  if (password) {
    userEvent.type(passwordInputElement, password)
  }
  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword)
  }

  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  }
}

const clickOnSubmitButton = () => {
  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i,
  })
  userEvent.click(submitBtnElement)
}

describe('Test App Component', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<App />)
  })

  describe('Input Fields are Blank on Initial Render', () => {
    test('Email Input value should be empty on initial render', () => {
      // const emailInputElement = screen.getByRole('textbox', {
      //   name: /email/i,
      // })
      expect(
        screen.getByRole('textbox', {
          name: /email/i,
        }).value
      ).toBe('')
    })

    test('Password Input value should be empty on initial render', () => {
      // const passwordInputElement = screen.getByLabelText('Password')
      expect(screen.getByLabelText('Password').value).toBe('')
    })

    test('Confirm Password Input value should be empty on initial render', () => {
      // const confirmPasswordInputElement =
      //   screen.getByLabelText(/confirm password/i)
      expect(screen.getByLabelText(/confirm password/i).value).toBe('')
    })
  })

  describe('Controlled Input Test', () => {
    test('Should be able to type an Email into the Input', () => {
      const { emailInputElement } = typeIntoForm({
        email: 'eltana@eltana.dev',
      })
      expect(emailInputElement.value).toBe('eltana@eltana.dev')
    })

    test('Should be able to type a Password into the Input', () => {
      const { passwordInputElement } = typeIntoForm({
        password: 's3cret',
      })
      expect(passwordInputElement.value).toBe('s3cret')
    })

    test('Should be able to type a Confirm Password into the Input', () => {
      const { confirmPasswordInputElement } = typeIntoForm({
        confirmPassword: 's3cret',
      })
      expect(confirmPasswordInputElement.value).toBe('s3cret')
    })
  })

  describe('Error Handling', () => {
    test('Should show email error when Invalid email is Typed', () => {
      //
      expect(
        screen.queryByText(/The Email is invalid!/i)
      ).not.toBeInTheDocument()

      typeIntoForm({
        email: 'eltanaeltana.dev', // Type Wrong Email Test
      })

      clickOnSubmitButton()

      expect(screen.getByText(/The Email is invalid!/i)).toBeInTheDocument()
    })

    test('Should Show Password Error if Password is less than 5 Characters', () => {
      typeIntoForm({
        email: 'eltana@eltana.dev',
        password: '123',
      })

      expect(
        screen.queryByText(
          /The Password should contain at least 5 Characters!/i
        )
      ).not.toBeInTheDocument()

      clickOnSubmitButton()

      expect(
        screen.getByText(/The Password should contain at least 5 Characters!/i)
      ).toBeInTheDocument()
    })

    test('Should Show Confirm Password does not Match Password', () => {
      //
      typeIntoForm({
        email: 'eltana@eltana.dev',
        password: 's3cret',
        confirmPassword: '12345', // WRONG PASSWORD
      })

      expect(
        screen.queryByText(/The Passwords do not match!/i)
      ).not.toBeInTheDocument()

      clickOnSubmitButton()

      expect(
        screen.getByText(/The Passwords do not match!/i)
      ).toBeInTheDocument()
    })

    test('Should Show No Error if Password If all Input Fields are Valid', () => {
      //
      typeIntoForm({
        email: 'eltana@eltana.dev',
        password: 's3cret',
        confirmPassword: 's3cret',
      })

      clickOnSubmitButton()

      expect(
        screen.queryByText(/The Email is invalid!/i) ||
          screen.queryByText(
            /The Password should contain at least 5 Characters!/i
          ) ||
          screen.queryByText(/The Passwords do not match!/i)
      ).not.toBeInTheDocument()
    })
  })
})
