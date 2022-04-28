import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './contentScript.css'
import { Card } from '@mui/material'
import { getOpenWeatherTempScale } from '../utils/storage'

import WeatherCard from '../common/weatherCard/WeatherCard'
import { WeatherTemplateScale } from '../utils/storage'
import { MessageType } from '../utils/message'

const ContentScript: React.FC<{}> = () => {
  const [tempScale, setTempScale] = useState<WeatherTemplateScale | null>(null)
  const [isActive, setIsActive] = useState<boolean>(false)
  useEffect(() => {
    getOpenWeatherTempScale().then((res) => {
      setTempScale(res)
      setIsActive(res.hasOverlay)
    })
  }, [])

  const handleMessages = (msg: MessageType) => {
    if (msg === MessageType.TOGGLE_OVERLAY) {
      setIsActive(!isActive)
    }
  }

  useEffect(() => {
    chrome.runtime.onMessage.addListener(handleMessages)
    return () => {
      // clean up event listener, bug fix from: https://www.udemy.com/course/chrome-extension/learn/#questions/14694484/
      chrome.runtime.onMessage.removeListener(handleMessages)
    }
  }, [isActive])

  return (
    <>
      {isActive ? (
        <Card className='overlayCard'>
          <WeatherCard city='Gopalganj' tempScale={tempScale} />
        </Card>
      ) : null}
    </>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<ContentScript />, root)
