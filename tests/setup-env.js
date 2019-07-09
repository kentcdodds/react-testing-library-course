import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'

// this is just a little hack to silence a warning that we'll get until react
// fixes and releases this: https://github.com/facebook/react/pull/14853
// when 16.9.0 is released, we should be able to remove all this code
// and there should be no errors logged.
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
