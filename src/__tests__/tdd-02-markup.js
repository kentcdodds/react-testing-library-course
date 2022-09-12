/* eslint-disable testing-library/await-async-utils */
/* eslint-disable testing-library/prefer-wait-for */
import React from 'react'
import {Redirect as MockRedirect} from 'react-router'
import {render, screen, wait} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Editor} from '../post-editor-001-markup'
import {savePost as mocksavePost} from '../api'

jest.mock('react-router', () => {
  const original = jest.requireActual('react-router')
  return {
    ...original,
    Redirect: jest.fn(() => null),
  }
})

jest.mock('../api.js')
afterEach(() => jest.clearAllMocks())

test('renders a form with title, content, tags, and a submit button', async () => {
  const msg = {
    title: 'This is my first TDD',
    content: 'test1 test2 test3',
    tags: ['test', 'jest', 'react', 'rtl'],
  }
  const preDate = new Date().getTime()

  mocksavePost.mockResolvedValueOnce(msg)
  const fakeUser = {id: 'user-1'}
  render(<Editor user={fakeUser} />)

  const elTitle = screen.getByLabelText(/title/i)
  const elContent = screen.getByLabelText(/content/i)
  const elTags = screen.getByLabelText(/tags/i)
  const submitBtn = screen.getByRole('button', {name: /submit/i})
  userEvent.type(elTitle, msg.title)
  userEvent.type(elContent, msg.content)
  userEvent.type(elTags, msg.tags.join(', '))

  expect(submitBtn).toBeEnabled()
  userEvent.click(submitBtn)
  expect(submitBtn).toBeDisabled()

  expect(mocksavePost).toHaveBeenCalledTimes(1)
  expect(mocksavePost).toHaveBeenCalledWith({
    ...msg,
    date: expect.any(String),
    authorId: fakeUser.id,
  })
  const postDate = new Date().getTime()
  const dateMock = new Date(mocksavePost.mock.calls[0][0].date).getTime()

  expect(dateMock).toBeGreaterThanOrEqual(preDate)
  expect(dateMock).toBeLessThanOrEqual(postDate)

  await wait(() => expect(MockRedirect).toHaveBeenCalledTimes(1))
  await wait(() => expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}))
})
