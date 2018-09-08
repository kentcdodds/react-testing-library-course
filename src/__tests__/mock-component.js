// these should normally be in your jest setupTestFrameworkScriptFile
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import {HiddenMessage} from '../hidden-message'

jest.mock('react-transition-group', () => {
  const FakeTransition = jest.fn(({children}) => children)
  const FakeCSSTransition = jest.fn(
    props =>
      props.in ? <FakeTransition>{props.children}</FakeTransition> : null,
  )
  return {CSSTransition: FakeCSSTransition, Transition: FakeTransition}
})

test('you can mock things with jest.mock', () => {
  const myMessage = 'hello world'
  const {getByText, queryByText} = render(
    <HiddenMessage>{myMessage}</HiddenMessage>,
  )
  expect(queryByText(myMessage)).not.toBeInTheDocument()
  fireEvent.click(getByText(/toggle/i))
  expect(getByText(myMessage)).toBeInTheDocument()
  fireEvent.click(getByText(/toggle/i))
  expect(queryByText(myMessage)).not.toBeInTheDocument()
})
