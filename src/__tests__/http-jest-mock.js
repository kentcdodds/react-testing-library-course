// these should normally be in your jest setupTestFrameworkScriptFile
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

// 0⃣ 🐨 you're going to need these
// import React from 'react'
// import {render, fireEvent, wait} from 'react-testing-library'
// import {loadGreeting as mockLoadGreeting} from '../api'
// import {GreetingLoader} from '../greeting-loader-01-mocking'

// our component makes an HTTP request when you click on the load button.
// we don't want it to do this for various reasons, so instead we'll mock
// the module responsible for making that HTTP call to have it return
// a fake version of what we want it to return.
// 4⃣ 🐨 use jest.mock to mock the '../api' module and return a fake `loadGreeting`:
// 💯 jest.fn(subject => Promise.resolve({data: {greeting: `Hi ${subject}`}})

// 👀 notice this as an async test:
test('loads greetings on click', async () => {
  // 1⃣ 🐨 render the GreetingLoader component
  //
  // 2⃣ 🐨 set the name input's value to whatever you like
  //
  // 3⃣ 🐨 use fireEvent to click on the load button
  //
  // 5⃣ 🐨 make an assertion that your mocked loadGreeting function was called once
  // and that it was called with the value you set to the name input's value.
  //
  // 6⃣ 🐨 use react-testing-library's `wait` utility to wait until the `greeting`
  // node has the correct text content.
  // 📖 https://github.com/kentcdodds/react-testing-library/blob/b18ff5b96210a887e784b9f53bd886e11b6ed5e0/README.md#wait
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=react-testing-library-course&e=http-jest-mock&em=
*/
test.skip('I submitted my elaboration and feedback', () => {
  const submitted = false // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////
