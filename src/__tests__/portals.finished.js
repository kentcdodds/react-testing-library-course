// these should normally be in your jest setupTestFrameworkScriptFile
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import {render} from 'react-testing-library'
import {Modal} from '../modal'

test('modal shows the children', () => {
  const {getByText} = render(
    <Modal>
      <div>test</div>
    </Modal>,
  )
  expect(getByText('test')).toBeInTheDocument()
})
