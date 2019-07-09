import React from 'react'
import {CSSTransition} from 'react-transition-group'

function Fade({children, ...props}) {
  return (
    <CSSTransition {...props} timeout={1000} className="fade">
      {children}
    </CSSTransition>
  )
}

function HiddenMessage({children}) {
  const [show, setShow] = React.useState(false)
  const toggle = () => setShow(s => !s)
  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      <Fade in={show}>
        <div>{children}</div>
      </Fade>
    </div>
  )
}

export {HiddenMessage}
