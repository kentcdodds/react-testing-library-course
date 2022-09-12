/* eslint-disable testing-library/await-async-utils */
/* eslint-disable testing-library/prefer-wait-for */
import React from 'react'
import {Redirect as MockRedirect} from 'react-router'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake, sequence} from 'test-data-bot'
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

// create random test data
const postBuilder = build('Post').fields({
  title: fake((f) => f.lorem.words()),
  content: fake((f) => f.lorem.paragraphs().replace(/\r/g, '')),
  tags: fake((f) => [f.lorem.words(), f.lorem.words(), f.lorem.words()]),
})

const userBuilder = build('User').fields({
  id: sequence((s) => `user-${s}`),
})

test('renders a form with title, content, tags, and a submit button', async () => {
  mocksavePost.mockResolvedValueOnce()
  const fakeUser = userBuilder()
  const fakePost = postBuilder()
  const preDate = new Date().getTime()

  render(<Editor user={fakeUser} />)

  const elTitle = screen.getByLabelText(/title/i)
  const elContent = screen.getByLabelText(/content/i)
  const elTags = screen.getByLabelText(/tags/i)
  const submitBtn = screen.getByRole('button', {name: /submit/i})
  userEvent.type(elTitle, fakePost.title)
  userEvent.type(elContent, fakePost.content)
  userEvent.type(elTags, fakePost.tags.join(', '))

  expect(submitBtn).toBeEnabled()
  userEvent.click(submitBtn)
  expect(submitBtn).toBeDisabled()

  expect(mocksavePost).toHaveBeenCalledTimes(1)
  expect(mocksavePost).toHaveBeenCalledWith({
    ...fakePost,
    date: expect.any(String),
    authorId: fakeUser.id,
  })

  const postDate = new Date().getTime()
  const date = new Date(mocksavePost.mock.calls[0][0].date).getTime()

  expect(date).toBeGreaterThanOrEqual(preDate)
  expect(date).toBeLessThanOrEqual(postDate)

  await waitFor(() => expect(MockRedirect).toHaveBeenCalledTimes(1))
  await waitFor(() => expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}))
})

test('renders an error message from the server', async () => {
  const errorMsg = 'test error'
  mocksavePost.mockRejectedValueOnce({data: {error: errorMsg}})
  const fakeUser = userBuilder()

  render(<Editor user={fakeUser} />)

  const submitBtn = await screen.findByRole('button', {name: /submit/i})

  expect(submitBtn).toBeEnabled()
  userEvent.click(submitBtn)
  expect(await screen.findByRole('alert')).toHaveTextContent(errorMsg)
  expect(submitBtn).toBeEnabled()
})
