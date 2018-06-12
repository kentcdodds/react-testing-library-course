import 'jest-dom/extend-expect'
import React from 'react'
import ReactDOM from 'react-dom'
import {
  renderIntoDocument,
  cleanup,
  getQueriesForElement,
} from 'react-testing-library'

const bodyUtils = getQueriesForElement(document.body)

class MyPortal extends React.Component {
  constructor(...args) {
    super(...args)
    this.portalNode = document.createElement('div')
    this.portalNode.dataset.testid = 'my-portal'
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

afterEach(cleanup)

function renderMyPortal() {
  const renderUtils = renderIntoDocument(<MyPortal />)
  const portalNode = bodyUtils.getByTestId('my-portal')
  return {
    portalNode,
    ...renderUtils,
    ...getQueriesForElement(portalNode),
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
