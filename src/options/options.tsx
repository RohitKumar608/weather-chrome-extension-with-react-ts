import React from 'react'
import ReactDOM from 'react-dom'

const test = <h1>Hello World</h1>

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(test, root)
