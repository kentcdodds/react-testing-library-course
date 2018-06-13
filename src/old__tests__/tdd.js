import 'jest-dom/extend-expect'
import React from 'react'
import {renderIntoDocument, cleanup} from 'react-testing-library'
import {Editor} from '../post-editor'

afterEach(cleanup)

test('renders a form with title, content, tags, and a submit button', () => {
  const {getByLabelText, getByText} = renderIntoDocument(<Editor />)
  getByLabelText(/title/i)
  getByLabelText(/content/i)
  getByLabelText(/tags/i)
  getByText(/submit/i)
})
