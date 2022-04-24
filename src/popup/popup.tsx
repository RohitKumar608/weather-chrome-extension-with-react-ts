import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import InputWithAdd from '../common/inputWithAdd'
import { getStoredCities, setStoredCities } from '../utils/storage'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import WeatherCard from './weatherCard'
import './popup.css'

const Test: React.FC = () => {
  const [cities, setCities] = useState<string[]>(['Gopalganj'])
  const [city, setCity] = useState<string>('')

  useEffect(() => {
    getStoredCities().then((res) => {
      setCities([...cities, ...res])
    })
  }, [])

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCity(e.target.value)
  }
  const cityAddHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault()
    const updatedCities = [...cities, city]
    setStoredCities(updatedCities).then((res) => {
      setCities(updatedCities)
      setCity('')
    })
  }

  const deleteCity = (city: string): void => {
    const updatedCities = cities.filter((c) => c !== city)
    setStoredCities(updatedCities).then((res) => {
      setCities(updatedCities)
    })
  }

  return (
    <>
      <InputWithAdd
        handleTextChange={handleTextChange}
        city={city}
        cityAddHandler={cityAddHandler}
      />
      {cities.map((city) => (
        <WeatherCard
          key={city}
          city={city}
          deleteCity={deleteCity}
          numberOfCities={cities.length}
        />
      ))}
    </>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(<Test />, root)
