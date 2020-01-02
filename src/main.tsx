import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Sample from './Sample'

const container = document.body.appendChild(
  document.createElement('div')
)

ReactDOM.render(<Sample />, container)
