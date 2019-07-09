// these should normally be in your jest setupFilesAfterEnv
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'

import React from 'react'
import {render} from '@testing-library/react'
import {Modal} from '../modal'

test('modal shows the children', () => {
  const {getByText} = render(
    <Modal>
      <div>test</div>
    </Modal>,
  )
  expect(getByText('test')).toBeInTheDocument()
})
