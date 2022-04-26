import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  Card,
  Grid,
  CardContent,
  Typography,
  TextField,
  Box,
  Button,
} from '@mui/material'

import {
  setOpenWeatherTempScale,
  getOpenWeatherTempScale,
  WeatherTemplateScale,
} from '../utils/storage'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import './options.css'

const Options = () => {
  const [tempScale, setTempScale] = useState<WeatherTemplateScale | null>(null)
  const [city, setCity] = useState<string>('')

  useEffect(() => {
    getOpenWeatherTempScale().then((scale) => {
      setTempScale(scale)
    })
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value)
  }

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setOpenWeatherTempScale({
      tempScale: tempScale?.tempScale,
      homeCity: city,
    } as WeatherTemplateScale).then((res) => {
      // setCity('')
    })
  }

  return (
    <Box mx='10%' my='2%'>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item>
              <Typography variant='h6'>Weather extension option</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                placeholder='Enter a home city'
                id='standard-basic'
                label='City name'
                variant='standard'
                value={tempScale?.homeCity || city}
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <Button
                onClick={handleSubmit}
                variant='contained'
                color='primary'
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)

ReactDOM.render(<Options />, root)
