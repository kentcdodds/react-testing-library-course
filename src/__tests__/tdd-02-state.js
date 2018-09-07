// these should normally be in your jest setupTestFrameworkScriptFile
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import {Editor} from '../post-editor-02-state'

test('renders a form with title, content, tags, and a submit button', () => {
  const {getByLabelText, getByText} = render(<Editor />)
  getByLabelText(/title/i)
  getByLabelText(/content/i)
  getByLabelText(/tags/i)
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  expect(submitButton).toBeDisabled()
})
