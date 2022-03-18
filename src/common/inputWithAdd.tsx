import React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'

interface InputWithAddInterface {
  cityAddHandler: () => void
  handleTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  city: string
}

const InputWithAdd: React.FC<InputWithAddInterface> = ({
  cityAddHandler,
  handleTextChange,
  city,
}) => {
  return (
    <Paper
      component='form'
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='Search Google Maps'
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton
        onClick={cityAddHandler}
        type='submit'
        sx={{ p: '10px' }}
        aria-label='search'
      >
        <AddIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
    </Paper>
  )
}

export default InputWithAdd
