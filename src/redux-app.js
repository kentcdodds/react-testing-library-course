import React from 'react'
import {connect} from 'react-redux'

////// counter.js

class Counter extends React.Component {
  increment = () => {
    this.props.dispatch({type: 'INCREMENT'})
  }

  decrement = () => {
    this.props.dispatch({type: 'DECREMENT'})
  }

  render() {
    return (
      <div>
        <h2>Counter</h2>
        <div>
          <button onClick={this.decrement}>-</button>
          <span data-testid="count-value">{this.props.count}</span>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    )
  }
}

// normally this would be:
// export default connect(state => ({count: state.count}))(Counter)
// but for this test we'll give it a variable name
// because we're doing this all in one file
const ConnectedCounter = connect(state => ({count: state.count}))(Counter)

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

export {ConnectedCounter, reducer}

// In another file, you'd import these things and do:
// const store = createStore(reducer)
// ReactDOM.render(
//   <Provider store={store}>
//     <ConnectedCounter />
//   </Provider>,
//   document.getElementById('root'),
// )
// but for this test we'll umm... not do that :)
