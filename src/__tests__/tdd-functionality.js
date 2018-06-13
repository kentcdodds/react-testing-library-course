import 'jest-dom/extend-expect'
import React from 'react'
import {renderIntoDocument, cleanup, wait} from 'react-testing-library'
import {build, fake, sequence} from 'test-data-bot'
import {Redirect as MockRedirect} from 'react-router'
import {Editor} from '../post-editor'

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})

afterEach(cleanup)

const postBuilder = build('Post').fields({
  title: fake(f => f.lorem.words()),
  content: fake(f => f.lorem.paragraphs()),
  tags: fake(f =>
    [f.lorem.word(), f.lorem.word(), f.lorem.word()].filter(
      (w, i, a) => a.indexOf(w) === i,
    ),
  ),
})

const userBuilder = build('User').fields({
  id: sequence(s => `user-${s}`),
})

test('renders a form with title, content, tags, and a submit button', async () => {
  const fakeUser = userBuilder()
  const {getByLabelText, getByText} = renderIntoDocument(
    <Editor user={fakeUser} />,
  )
  const fakePost = postBuilder()
  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = getByText(/submit/i)
  submitButton.click()
  expect(submitButton).toHaveAttribute('disabled')
  await wait(() => expect(MockRedirect).toHaveBeenCalledTimes(1))
  expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {})
})
