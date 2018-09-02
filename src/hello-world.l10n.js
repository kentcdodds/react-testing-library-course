import React from 'react'

import {Trans} from '@lingui/react'

function Greeting() {
  return (
    <p>
      <Trans>
        Go checkout <a href="https://lingui.js.org">jslingui</a>!
      </Trans>
    </p>
  )
}

export {Greeting}
