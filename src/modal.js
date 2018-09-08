import React from 'react'
import ReactDOM from 'react-dom'

let modalRoot = document.getElementById('modal-root')
if (!modalRoot) {
  modalRoot = document.createElement('div')
  modalRoot.setAttribute('id', 'modal-root')
  document.body.appendChild(modalRoot)
}

// don't use this for your modals.
// you need to think about accessibility and styling.
// Look into: https://ui.reach.tech/dialog
class Modal extends React.Component {
  el = document.createElement('div')
  componentDidMount() {
    modalRoot.appendChild(this.el)
  }
  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }
  render() {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}

export {Modal}
