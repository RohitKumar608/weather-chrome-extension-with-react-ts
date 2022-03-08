import React from 'react'
import ReactDOM from 'react-dom'

import WeatherCard from './weatherCard'
import './popup.css'

const Test: React.FC = () => {
  return <WeatherCard city='Gopalganj' />
}

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(<Test />, root)
