import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { fetchOpenWeatherData, OpenWeatherData } from '../../utils/app'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import ClearIcon from '@mui/icons-material/Clear'

const WeatherCard: React.FC<{
  city: string
  deleteCity: (name: string) => void
  numberOfCities: number
}> = ({ city, deleteCity, numberOfCities }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
  const [apiState, setApiState] = useState<{
    isLoading: boolean
    isSuccess: boolean
  }>({ isLoading: true, isSuccess: false })
  useEffect(() => {
    fetchOpenWeatherData(city)
      .then((data) => {
        setWeatherData(data)
        setApiState({ isLoading: false, isSuccess: true })
      })
      .catch((err) => {
        setApiState({ isLoading: false, isSuccess: false })
      })
  }, [city])
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
      <Card>
        <CardContent>
          <Typography variant='h5'>{weatherData.name}</Typography>
          <Typography variant='body1'>
            {Math.round(weatherData.main.temp)}
          </Typography>
          <Typography variant='body1'>
            Feels like: {weatherData.main.feels_like}
          </Typography>
        </CardContent>
        <div
          onClick={() => deleteCity(city)}
          style={{
            position: 'absolute',
            right: '5px',
            top: '5px',
            cursor: 'pointer',
          }}
        >
          {numberOfCities !== 1 && <ClearIcon color='error' />}
        </div>
      </Card>
    </Box>
  ) : (
    <Box sx={{ minWidth: 275, mx: '4px', my: '16px', position: 'relative' }}>
      <Card>
        <CardContent>
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity='error'>Something went wrong</Alert>
          </Stack>
        </CardContent>
        <div
          onClick={() => deleteCity(city)}
          style={{
            position: 'absolute',
            right: '5px',
            top: '5px',
            cursor: 'pointer',
          }}
        >
          {numberOfCities !== 1 && <ClearIcon color='error' />}
        </div>
      </Card>
    </Box>
  )
}

export default WeatherCard
