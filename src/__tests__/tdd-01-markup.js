/* eslint-disable testing-library/await-async-utils */
/* eslint-disable testing-library/prefer-wait-for */
import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Editor} from '../post-editor-00-markup'

test('renders a form with title, content, tags, and a submit button', () => {
  render(<Editor />)
  const elTitle = screen.getByLabelText(/title/i)
  const elContent = screen.getByLabelText(/content/i)
  const elTags = screen.getByLabelText(/tags/i)
  const submitBtn = screen.getByRole('button', {name: /submit/i})

  const msgTitle = 'This is my first TDD'
  const msgContent = 'test1 test2 test3'
  const msgTags = 'test jest react rtl'

  userEvent.type(elTitle, msgTitle)
  userEvent.type(elContent, msgContent)
  userEvent.type(elTags, msgTags)

  expect(submitBtn).toBeEnabled()
  userEvent.click(submitBtn)
  expect(submitBtn).toBeDisabled()
  /*  
  await wait(() => expect(elTitle).toHaveTextContent(msgTitle))
  await wait(() => expect(elContent).toHaveTextContent(msgContent))
  await wait(() => expect(elTags).toHaveTextContent(msgTags))
  */
})
