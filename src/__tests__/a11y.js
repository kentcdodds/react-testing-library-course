import * as React from 'react'
import {render} from '@testing-library/react'
import {axe} from 'jest-axe'

function InaccessibleForm() {
  // Form inputs must have an accessible name
  // Ref: 4.1.1 of W3C HTML Accessibility API Mappings 1.0
  return (
    <form>
      <input id="username" />
    </form>
  )
}

function AccessibleForm() {
  return (
    <form>
      <label htmlFor="username">Username</label>
      <input id="username" placeholder="username" />
    </form>
  )
}

test('inaccessible forms fail axe', async () => {
  const {container} = render(<InaccessibleForm />)
  const axeResult = await axe(container)
  expect(() => expect(axeResult).toHaveNoViolations()).toThrow()
  // NOTE: I can't think of a situation where you'd want to test that some HTML
  // actually _does_ have accessibility issues... This is only here for
  // demonstration purposes.
})

test('accessible forms pass axe', async () => {
  const {container} = render(<AccessibleForm />)
  expect(await axe(container)).toHaveNoViolations()
})
