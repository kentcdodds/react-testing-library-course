import 'jest-dom/extend-expect'
// I added this for you. If I didn't explain this during the lecture, ask me now!
import 'react-testing-library/cleanup-after-each'
import React from 'react'
// 🐨 you'll need to import the fireEvent utility from react-testing-library
import {render} from 'react-testing-library'
import {FavoriteNumber} from '../favorite-number'

test('renders a number input with a label "Favorite Number"', () => {
  // 🐨 you're going to need getByTestId (see the favorite-number file and note the data-test attribute).
  const {getByLabelText} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  // 🐨 let's use fireEvent.change to fire a change event on the input to change the value to 10
  // 📖 learn more here: https://github.com/kentcdodds/react-testing-library/blob/61e382f10d2d8d0be458103b7c267101541ed952/README.md#fireeventnode-htmlelement-event-event

  // 🐨 let's replace this assertion with a new one that verifies the node with the test ID of 'error-message' has text "The number is invalid"
  expect(input).toHaveAttribute('type', 'number')
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=react-testing-library-course&e=state&em=felixglush@gmail.com
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
