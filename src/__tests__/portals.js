// these should normally be in your jest setupTestFrameworkScriptFile
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

// 0⃣ 🐨 you'll need these
// import React from 'react'
// import {render} from 'react-testing-library'
// import {Modal} from '../modal'

test('modal shows the children', () => {
  // 1⃣ 🐨 render the modal with anything you want as the children
  // 2⃣ 🐨 add an assertion that what you want is in the document.
  // seriously... that's it...
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=react-testing-library-course&e=portals&em=felixglush@gmail.com
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
