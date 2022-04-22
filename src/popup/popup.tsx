import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import InputWithAdd from '../common/inputWithAdd'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import WeatherCard from './weatherCard'
import './popup.css'

const Test: React.FC = () => {
  const [cities, setCities] = useState<string[]>([])
  const [city, setCity] = useState<string>('')

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCity(e.target.value)
  }
  const cityAddHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault()
    setCities([...cities, city])
    setCity('')
  }

  return (
    <>
      <InputWithAdd
        handleTextChange={handleTextChange}
        city={city}
        cityAddHandler={cityAddHandler}
      />
      <WeatherCard city='Gopalganj' />
      {cities.map((city) => (
        <WeatherCard key={city} city={city} />
      ))}
    </>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(<Test />, root)
