import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import InputWithAdd from '../common/inputWithAdd'
import {
  getStoredCities,
  setStoredCities,
  setOpenWeatherTempScale,
  getOpenWeatherTempScale,
  WeatherTemplateScale,
} from '../utils/storage'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import WeatherCard from './weatherCard'
import './popup.css'

const Test: React.FC = () => {
  const [cities, setCities] = useState<string[]>([])
  const [city, setCity] = useState<string>('')
  const [tempScale, setTempScale] = useState<WeatherTemplateScale | null>(null)

  useEffect(() => {
    getStoredCities().then((res) => {
      setCities([...cities, ...res])
    })
    getOpenWeatherTempScale().then((res) => {
      setTempScale(res)
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

  const handleTempScaleChange = (
    evt: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ): void => {
    setOpenWeatherTempScale({
      tempScale: newAlignment,
      homeCity: tempScale?.homeCity,
    } as WeatherTemplateScale).then(() => {
      setTempScale({
        tempScale: newAlignment,
        homeCity: tempScale?.homeCity,
      } as WeatherTemplateScale)
    })
  }

  console.log(cities, 'tempScale?.homeCity', tempScale?.homeCity)

  return (
    <>
      <InputWithAdd
        handleTextChange={handleTextChange}
        city={city}
        cityAddHandler={cityAddHandler}
        tempScale={tempScale}
        handleTempScaleChange={handleTempScaleChange}
      />
      {tempScale?.homeCity !== '' && tempScale?.homeCity !== undefined && (
        <WeatherCard
          key={tempScale?.homeCity}
          city={tempScale?.homeCity}
          tempScale={tempScale}
        />
      )}
      {cities.map((city) => (
        <WeatherCard
          key={city}
          city={city}
          deleteCity={deleteCity}
          tempScale={tempScale}
        />
      ))}
    </>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(<Test />, root)
