// these should normally be in your jest setupTestFrameworkScriptFile
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import {render, fireEvent} from 'react-testing-library'
// 🐨 you'll need to import your mock savePost from '../api' here
import {Editor} from '../post-editor'

// 🐨 use jest.mock to mock out the ../api module and return a `savePost`
// jest.fn function that resolves a promise

// 🐨 after each test, the mock savePost mock function should be cleared (mockClear)

// 🐨 unskip this test
test.skip('renders a form with title, content, tags, and a submit button', () => {
  // 🐨 pass a fake user (an object with an ID) to the editor as a prop
  const {getByLabelText, getByText} = render(<Editor />)

  // 🐨 set the value of each of these fields
  getByLabelText(/title/i)
  getByLabelText(/content/i)
  // 💯 tags should be a comma-separated list of values here
  getByLabelText(/tags/i)
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  expect(submitButton).toBeDisabled()

  // 🐨 assert that the mock `savePost` function was called once
  // and was called with the fake post data (title, content, and tags) and the authorId
  // 💯 tags should be an array of values here.
})
