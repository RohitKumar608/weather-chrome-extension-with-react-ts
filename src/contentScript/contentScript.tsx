import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './contentScript.css'
import { Card } from '@mui/material'
import { getOpenWeatherTempScale } from '../utils/storage'

import WeatherCard from '../common/weatherCard/WeatherCard'
import { WeatherTemplateScale } from '../utils/storage'

const ContentScript: React.FC<{}> = () => {
  const [tempScale, setTempScale] = useState<WeatherTemplateScale | null>(null)
  useEffect(() => {
    getOpenWeatherTempScale().then((res) => {
      setTempScale(res)
    })
  }, [])
  return (
    <Card className='overlayCard'>
      <WeatherCard city='Gopalganj' tempScale={tempScale} />
    </Card>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<ContentScript />, root)
