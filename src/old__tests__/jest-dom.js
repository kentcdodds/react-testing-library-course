import 'jest-dom/extend-expect'
import React from 'react'
import {render} from 'react-testing-library'

function Greet({greeting, subject}) {
  return (
    <div>
      {greeting} {subject}
    </div>
  )
}

test('greet renders a greeting', () => {
  const {container} = render(<Greet greeting="Hello" subject="World" />)
  expect(container.firstChild).toHaveTextContent('Hello World')
})
