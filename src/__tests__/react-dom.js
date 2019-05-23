// 🐨 you're going to need to use React to create react elements, so import react
// 🐨 we're going to render the FavoriteNumber component with ReactDOM so you'll need to import react-dom
import React from 'react'
import ReactDOM from 'react-dom'
import {FavoriteNumber} from '../favorite-number'

test('renders a number input with a label "Favorite Number"', () => {
  const container = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, container)

  const labelNode = container.querySelector('label')
  const inputNode = container.querySelector('input')

  expect(labelNode.textContent).toBe('Favorite Number')
  expect(inputNode.type).toBe('number')
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=react-testing-library-course&e=react-dom&em=felixglush@gmail.com
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
