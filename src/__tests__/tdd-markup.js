import 'jest-dom/extend-expect'
import React from 'react'
import {render} from 'react-testing-library'
import {Editor} from '../post-editor'

test('renders a form with title, content, tags, and a submit button', () => {
  const {getByLabelText, getByText} = render(<Editor />)
  getByLabelText(/title/i)
  getByLabelText(/content/i)
  getByLabelText(/tags/i)
  getByText(/submit/i)
})
