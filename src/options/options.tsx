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
  Switch,
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
  const [checked, setChecked] = useState<boolean>(false)
  const [saving, setSaving] = useState<boolean>(false)

  useEffect(() => {
    getOpenWeatherTempScale().then((scale) => {
      setTempScale(scale)
      setChecked(scale?.hasOverlay)
      setCity(scale?.homeCity)
    })
  }, [])

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value)
  }

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setSaving(true)
    setOpenWeatherTempScale({
      ...tempScale,
      homeCity: city,
      hasOverlay: checked,
    } as WeatherTemplateScale).then((res) => {
      setSaving(false)
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
                value={city}
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Switch
                checked={checked}
                onChange={handleSwitchChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Grid>
            <Grid item>
              <Button
                onClick={handleSubmit}
                variant='contained'
                color='primary'
                disabled={saving}
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
