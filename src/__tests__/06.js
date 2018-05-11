// portals

import React from 'react'
import ReactDOM from 'react-dom'
import {renderIntoDocument, cleanup} from 'react-testing-library'
import {bindElementToQueries} from 'dom-testing-library'
import 'jest-dom/extend-expect'

const bodyUtils = bindElementToQueries(document.body)

class MyPortal extends React.Component {
  constructor(...args) {
    super(...args)
    this.portalNode = document.createElement('div')
    this.portalNode.setAttribute("data-testid", "my-portal");
  }
  componentDidMount() {
    document.body.appendChild(this.portalNode)
  }
  componentWillUnmount() {
    this.portalNode.parentNode.removeChild(this.portalNode)
  }
  render() {
    return ReactDOM.createPortal(
      <Greet greeting="Hello" subject="World" />,
      this.portalNode,
    )
  }
}

function Greet({greeting, subject}) {
  return (
    <div>
      <strong>
        {greeting} {subject}
      </strong>
    </div>
  )
}

beforeEach(cleanup)

function renderMyPortal() {
  const renderUtils = renderIntoDocument(<MyPortal />)
  const portalNode = bodyUtils.getByTestId('my-portal')
  return {
    portalNode,
    ...renderUtils,
    ...bindElementToQueries(portalNode),
  }
}

test('greet renders a greeting in a portal', () => {
  const {getByText} = renderMyPortal()
  expect(getByText('Hello World')).toBeInTheDOM()
})

test('removes the node from the document when it unmounts', () => {
  const {unmount, portalNode} = renderMyPortal()
  expect(document.body.contains(portalNode)).toBe(true)
  unmount()
  expect(document.body.contains(portalNode)).toBe(false)
})
