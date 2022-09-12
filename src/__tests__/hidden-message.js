//https://www.chakshunyu.com/blog/how-to-mock-only-one-function-from-a-module-in-jest/

/* eslint-disable testing-library/prefer-wait-for */
import React from 'react'
import {render, screen, wait} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as moduleTransition from 'react-transition-group'

import {HiddenMessage} from '../hidden-message'
const myMessage = 'Hello'

// - - - - - - - - - - - - - - - - - - - - - -
// Version 1

// eslint-disable-next-line no-import-assign
//moduleTransition.CSSTransition = jest.fn().mockImplementation((props) => (props.in ? props.children : null))
//shorthand
// eslint-disable-next-line no-import-assign
moduleTransition.CSSTransition = jest.fn(props =>
  props.in ? props.children : null,
)
// Version 2 with spyOn
/* jest
  .spyOn(moduleTransition, 'CSSTransition')
  .mockImplementation((props) => (props.in ? props.children : null))
 */
// Version 3 mock the entire module, capture the original code and imports from the module
// and reset those, while mocking the one which has been wanted
/* jest.mock('react-transition-group', () => {
  //if jest.mock is used, jest.requireAcutal is needed to make to other functions work
  const module = jest.requireActual('react-transition-group')
  return {
    ...module,
    CSSTransition: (props) => (props.in ? props.children : null),
  }
}) */
// Version kcd
/* jest.mock('react-transition-group', () => {
  //if jest.mock is used, jest.requireAcutal is needed to make to other functions work
  return {
    CSSTransition: (props) => (props.in ? props.children : null),
  }
}) */

// - - - - - - - - - - - - - - - - - - - - - -

afterAll(() => {
  jest.clearAllMocks()
})

test('ASYNC checks if hidden-message shows up when clicked on the button', async () => {
  render(<HiddenMessage>{myMessage}</HiddenMessage>)
  expect(screen.queryByText(myMessage)).not.toBeInTheDocument()
  const btn = screen.getByRole('button', {name: /toggle/i})
  userEvent.click(btn)
  expect(screen.getByText(myMessage)).toBeInTheDocument()
  userEvent.click(btn)
  await wait(() =>
    expect(screen.queryByText(myMessage)).not.toBeInTheDocument(),
  )
  //expect(screen.queryByText(myMessage)).not.toBeInTheDocument()
})
// to not been hoisted

test('Mocked Module CSSTransition: check if hidden-message shows up when clicked on the button', () => {
  render(<HiddenMessage>{myMessage}</HiddenMessage>)
  expect(screen.queryByText(myMessage)).not.toBeInTheDocument()
  const btn = screen.getByRole('button', {name: /toggle/i})
  userEvent.click(btn)

  expect(screen.getByText(myMessage)).toBeInTheDocument()
  userEvent.click(btn)
  expect(screen.queryByText(myMessage)).not.toBeInTheDocument()
})
