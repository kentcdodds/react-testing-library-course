import React from 'react'
import * as api from './api'

function GreetingLoader({loadGreeting = api.loadGreeting}) {
  const [greeting, setGreeting] = React.useState('')
  async function loadGreetingForInput(e) {
    e.preventDefault()
    const {data} = await loadGreeting(e.target.elements.name.value)
    setGreeting(data.greeting)
  }
  return (
    <form onSubmit={loadGreetingForInput}>
      <label htmlFor="name">Name</label>
      <input id="name" />
      <button type="submit">Load Greeting</button>
      <div data-testid="greeting">{greeting}</div>
    </form>
  )
}

export {GreetingLoader}
