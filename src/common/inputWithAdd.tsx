import React from 'react'
import {
  Paper,
  InputBase,
  Divider,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'

import { WeatherTemplateScale } from '../utils/storage'

interface InputWithAddInterface {
  cityAddHandler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  city: string
  tempScale: WeatherTemplateScale | null
  handleTempScaleChange: (
    evt: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => void
}

const InputWithAdd: React.FC<InputWithAddInterface> = ({
  cityAddHandler,
  handleTextChange,
  city,
  tempScale,
  handleTempScaleChange,
}) => {
  return (
    <Paper
      component='form'
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '97%',
        margin: 'auto',
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='Add city name'
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={handleTextChange}
        value={city}
      />
      <IconButton
        onClick={cityAddHandler}
        type='submit'
        sx={{ p: '10px' }}
        aria-label='search'
      >
        <AddIcon />
      </IconButton>
      <ToggleButtonGroup
        color='primary'
        value={tempScale?.tempScale}
        exclusive
        onChange={handleTempScaleChange}
      >
        <ToggleButton value='imperial'>F</ToggleButton>
        <ToggleButton value='metric'>C</ToggleButton>
      </ToggleButtonGroup>
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
    </Paper>
  )
}

export default InputWithAdd
