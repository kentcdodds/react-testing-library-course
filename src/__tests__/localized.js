// these should normally be in your jest setupTestFrameworkScriptFile
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import {render} from 'react-testing-library'
import {Greeting} from '../hello-world.l10n'

test('renders with default content', () => {
  const {debug} = render(<Greeting />)
  debug()
})
