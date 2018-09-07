// these should normally be in your jest setupTestFrameworkScriptFile
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import {render, fireEvent, wait, waitForElement} from 'react-testing-library'
import {build, fake, sequence} from 'test-data-bot'
import {Redirect as MockRedirect} from 'react-router'
import {savePost as mockSavePost} from '../api'
import {Editor} from '../post-editor-07-error-state'

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})

jest.mock('../api', () => {
  return {
    savePost: jest.fn(() => Promise.resolve()),
  }
})

afterEach(() => {
  MockRedirect.mockClear()
  mockSavePost.mockClear()
})

const postBuilder = build('Post').fields({
  title: fake(f => f.lorem.words()),
  content: fake(f => f.lorem.paragraphs().replace(/\r/g, '')),
  tags: fake(f => [f.lorem.word(), f.lorem.word(), f.lorem.word()]),
})

const userBuilder = build('User').fields({
  id: sequence(s => `user-${s}`),
})

test('renders a form with title, content, tags, and a submit button', async () => {
  const fakeUser = userBuilder()
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)
  const fakePost = postBuilder()
  const preDate = Date.now()

  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  expect(submitButton).toBeDisabled()

  expect(mockSavePost).toHaveBeenCalledTimes(1)
  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    date: expect.any(String),
    authorId: fakeUser.id,
  })

  const postDate = Date.now()
  const date = new Date(mockSavePost.mock.calls[0][0].date).getTime()
  expect(date).toBeGreaterThanOrEqual(preDate)
  expect(date).toBeLessThanOrEqual(postDate)

  await wait(() => expect(MockRedirect).toHaveBeenCalledTimes(1))

  expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {})
})

test('renders an error message from the server', async () => {
  const testError = 'test error'
  mockSavePost.mockRejectedValueOnce({data: {error: testError}})
  const fakeUser = userBuilder()
  const {getByLabelText, getByTestId, getByText} = render(
    <Editor user={fakeUser} />,
  )
  const fakePost = postBuilder()

  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  const postError = await waitForElement(() => getByTestId('post-error'))
  expect(postError).toHaveTextContent(testError)
})
