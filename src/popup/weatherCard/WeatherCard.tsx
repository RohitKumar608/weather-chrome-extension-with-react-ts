import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { fetchOpenWeatherData, OpenWeatherData } from '../../utils/app'

const WeatherCard: React.FC<{ city: string }> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData>(null)
  const [success, setSuccess] = useState<{
    isLoading: boolean
    isSuccess: boolean
  }>({ isLoading: true, isSuccess: false })
  useEffect(() => {
    fetchOpenWeatherData(city)
      .then((data) => {
        setWeatherData(data)
        setSuccess({ isLoading: false, isSuccess: true })
      })
      .catch((err) => {
        console.log(err)
        setSuccess({ isLoading: false, isSuccess: false })
      })
  }, [city])
  return success ? (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant='h5'>{city}</Typography>
      </CardContent>
    </Card>
  ) : (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity='error'>Something went wrong</Alert>
    </Stack>
  )
}

export default WeatherCard
