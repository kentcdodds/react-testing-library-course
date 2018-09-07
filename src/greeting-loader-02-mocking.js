import React, {Component} from 'react'
import {loadGreeting} from './api'

class GreetingLoader extends Component {
  inputRef = React.createRef()
  state = {greeting: ''}
  loadGreetingForInput = async e => {
    e.preventDefault()
    const {data} = await loadGreeting(this.inputRef.current.value)
    this.setState({greeting: data.greeting})
  }
  render() {
    return (
      <form onSubmit={this.loadGreetingForInput}>
        <label htmlFor="name">Name</label>
        <input id="name" ref={this.inputRef} />
        <button type="submit">Load Greeting</button>
        <div data-testid="greeting">{this.state.greeting}</div>
      </form>
    )
  }
}

export {GreetingLoader}
