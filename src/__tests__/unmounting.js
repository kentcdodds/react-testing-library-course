// these should normally be in your jest setupTestFrameworkScriptFile
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

// 0⃣ 🐨 you're gonna need these
// import React from 'react'
// import {render} from 'react-testing-library'
// import {Countdown} from '../countdown'

// because we're doing a time-based thing in our component, we need to force
// time in our tests to pass by a determanistic amount.
// 3⃣ 🐨 Use the `jest.useFakeTimers` API:
// jest.useFakeTimers() // 💯
// 📖 https://jestjs.io/docs/en/timer-mocks.html

// we need to spy on console.error so we can assert that it's not called
// (if it is called then that means we're calling setState after the component
// was unmounted)
// 5⃣ 🐨 before each test use `jest.spyOn` to spy on console.error
// 📖 https://jestjs.io/docs/en/jest-object#jestspyonobject-methodname
// 6⃣ 🐨 after each test, use `mockRestore` to cleanup after yourself.
// 📖 https://jestjs.io/docs/en/mock-function-api#mockfnmockrestore

test('does not attempt to set state when unmounted (to prevent memory leaks)', () => {
  // 1⃣ 🐨 render the countdown
  // 2⃣ 🐨 unmount the component
  // 📖 https://github.com/kentcdodds/react-testing-library/blob/b18ff5b96210a887e784b9f53bd886e11b6ed5e0/README.md#unmount
  //
  // now that our component has unmounted, we need to make time pass.
  // 4⃣ 🐨 Use `jest.runOnlyPendingTimers` to make time pass.
  // 📖 https://jestjs.io/docs/en/timer-mocks.html
  //
  // 7⃣ 🐨 Make an assertion that console.error was not called
  // (then, you can test that it worked by removing the componentWillUnMount in
  // the countdown component)
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=react-testing-library-course&e=unmounting&em=felixglush@gmail.com
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
