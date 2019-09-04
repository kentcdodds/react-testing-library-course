import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

////// counter.js

function Counter() {
  const count = useSelector(state => state.count)
  const dispatch = useDispatch()
  const increment = () => dispatch({type: 'INCREMENT'})
  const decrement = () => dispatch({type: 'DECREMENT'})
  return (
    <div>
      <h2>Counter</h2>
      <div>
        <button onClick={decrement}>-</button>
        <span aria-label="count">{count}</span>
        <button onClick={increment}>+</button>
      </div>
    </div>
  )
}

////// reducers.js

const initialState = {count: 0}
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
      }
    case 'DECREMENT':
      return {
        count: state.count - 1,
      }
    default:
      return state
  }
}

export {Counter, reducer}

// In another file, you'd import these things and do:
// const store = createStore(reducer)
// ReactDOM.render(
//   <Provider store={store}>
//     <Counter />
//   </Provider>,
//   document.getElementById('root'),
// )
// but for this test we'll umm... not do that :)
