import React from 'react'
import {Switch, Route, Link} from 'react-router-dom'

const About = () => (
  <div data-testid="about-screen">You are on the about page</div>
)
const Home = () => <div data-testid="home-screen">You are home</div>
const NoMatch = () => <div data-testid="no-match-screen">No match</div>

function Main() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  )
}

export {Main}
