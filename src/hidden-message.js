import React from 'react'
import {CSSTransition} from 'react-transition-group'

function Fade({children, ...props}) {
  return (
    <CSSTransition {...props} unmountOnExit timeout={1000} className="fade">
      {children}
    </CSSTransition>
  )
}

class HiddenMessage extends React.Component {
  state = {show: false}
  toggle = () => {
    this.setState(({show}) => ({show: !show}))
  }
  render() {
    return (
      <div>
        <button onClick={this.toggle}>Toggle</button>
        <Fade in={this.state.show}>
          <div>{this.props.children}</div>
        </Fade>
      </div>
    )
  }
}

export {HiddenMessage}
