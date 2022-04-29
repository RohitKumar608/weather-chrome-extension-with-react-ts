import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Alert,
  Stack,
  Box,
  Skeleton,
} from '@mui/material'

import ClearIcon from '@mui/icons-material/Clear'
import {
  fetchOpenWeatherData,
  OpenWeatherData,
  getWeatherIconSrc,
} from '../../utils/app'
import { WeatherTemplateScale } from '../../utils/storage'

import './WeatherCard.css'

const WeatherCard: React.FC<{
  city: string
  deleteCity?: (name: string) => void
  tempScale: WeatherTemplateScale | null
}> = ({ city, deleteCity, tempScale }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
  const [apiState, setApiState] = useState<{
    isLoading: boolean
    isSuccess: boolean
  }>({ isLoading: true, isSuccess: false })
  useEffect(() => {
    fetchOpenWeatherData(city, tempScale?.tempScale)
      .then((data) => {
        setWeatherData(data)
        setApiState({ isLoading: false, isSuccess: true })
      })
      .catch((err) => {
        setApiState({ isLoading: false, isSuccess: false })
      })
  }, [city, tempScale])
  if (apiState.isLoading) {
    return (
      <Box sx={{ width: 300 }}>
        <Skeleton />
        <Skeleton animation='wave' />
        <Skeleton animation={false} />
      </Box>
    )
  }
  return apiState.isSuccess ? (
    <Box sx={{ minWidth: 275, mx: '4px', my: '16px', position: 'relative' }}>
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <CardContent>
          <Typography variant='h5'>{weatherData.name}</Typography>
          <Typography variant='body1'>
            {Math.round(weatherData.main.temp)}
          </Typography>
          <Typography variant='body1'>
            Feels like: {weatherData.main.feels_like}
          </Typography>
        </CardContent>
        <div className='weather-condition'>
          {weatherData.weather.length > 0 && (
            <>
              <img src={getWeatherIconSrc(weatherData.weather[0].icon)} />
              <Typography className='weatherCard-body'>
                {weatherData.weather[0].main}
              </Typography>
            </>
          )}
        </div>
        {typeof deleteCity === 'function' && (
          <div
            onClick={() => deleteCity(city)}
            style={{
              position: 'absolute',
              right: '5px',
              top: '5px',
              cursor: 'pointer',
            }}
          >
            <ClearIcon color='error' />
          </div>
        )}
      </Card>
    </Box>
  ) : (
    <Box sx={{ minWidth: 275, mx: '4px', my: '16px', position: 'relative' }}>
      <Card>
        <CardContent>
          <Typography variant='body1'>{city}</Typography>
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity='error'>Something went wrong</Alert>
          </Stack>
        </CardContent>
        {typeof deleteCity === 'function' && (
          <div
            onClick={() => deleteCity(city)}
            style={{
              position: 'absolute',
              right: '5px',
              top: '5px',
              cursor: 'pointer',
            }}
          >
            <ClearIcon color='error' />
          </div>
        )}
      </Card>
    </Box>
  )
}

export default WeatherCard
