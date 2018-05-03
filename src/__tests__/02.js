import React from 'react'
import {render} from 'react-testing-library'
import 'jest-dom/extend-expect'

function Greet({greeting, subject}) {
  return (
    <div>
      <strong>
        {greeting} {subject}
      </strong>
    </div>
  )
}

test('greet renders a greeting', () => {
  const {getByText} = render(<Greet greeting="Hello" subject="World" />)
  expect(getByText('Hello World')).toBeInTheDOM()
})
