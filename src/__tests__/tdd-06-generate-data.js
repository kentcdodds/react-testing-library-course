// these should normally be in your jest setupTestFrameworkScriptFile
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import {render, fireEvent, wait} from 'react-testing-library'
// 🐨 you'll need this:
// import {build, fake, sequence} from 'test-data-bot'
import {Redirect as MockRedirect} from 'react-router'
import {savePost as mockSavePost} from '../api'
import {Editor} from '../post-editor'

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

// 🐨 make a postBuilder and a userBuilder using test-data-bot
// 📖 https://github.com/jackfranklin/test-data-bot

// 🐨 unskip this test
test.skip('renders a form with title, content, tags, and a submit button', async () => {
  // 🐨 swap this object with a call to your userBuilder
  const fakeUser = {id: 'user-1'}
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)
  // 🐨 swap this object with a call to your postBuilder
  const fakePost = {
    title: 'Test Title',
    content: 'Test content',
    tags: ['tag1', 'tag2'],
  }
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
