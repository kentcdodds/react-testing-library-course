import React from 'react'
import {render, Simulate} from 'react-testing-library'
import 'jest-dom/extend-expect'

function Login({onSubmit}) {
  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        onSubmit({
          username: event.target.elements.username.value,
          password: event.target.elements.password.value,
        })
      }}
    >
      <label htmlFor="username">Username</label>
      <input id="username" type="text" />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" />
      <button type="submit">Submit</button>
    </form>
  )
}

test('greet renders a greeting', () => {
  const handleSubmit = jest.fn()
  const {getByText, getByLabelText, container} = render(
    <Login onSubmit={handleSubmit} />,
  )
  const usernameNode = getByLabelText('Username')
  const passwordNode = getByLabelText('Password')
  const submitButton = getByText('submit')

  const fakeUser = {username: 'alice', password: 'in wonderland'}

  usernameNode.value = fakeUser.username
  passwordNode.value = fakeUser.password

  Simulate.submit(container.querySelector('form'))
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(fakeUser)
  expect(submitButton).toHaveAttribute('type', 'submit')
})
