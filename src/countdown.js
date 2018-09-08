import React from 'react'

class Countdown extends React.Component {
  state = {remainingTime: 10000}
  componentDidMount() {
    const end = Date.now() + this.state.remainingTime
    this.interval = setInterval(() => {
      const remainingTime = end - Date.now()
      if (remainingTime <= 0) {
        clearInterval(this.interval)
        this.setState({remainingTime: 0})
      } else {
        console.log('setting state')
        this.setState({
          remainingTime,
        })
      }
    })
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    return this.state.remainingTime
  }
}

export {Countdown}
