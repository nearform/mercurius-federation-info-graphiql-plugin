import React from 'react'

import { FormControl, TextField, InputAdornment, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

const SearchServiceInput = ({ query, setQuery }) => (
  <Box sx={{ overflow: 'auto', paddingBottom: 4 }}>
    <FormControl>
      <TextField
        value={query}
        onChange={e => setQuery(e.target.value)}
        size="small"
        variant="outlined"
        margin="none"
        inputProps={{
          style: {
            padding: '0',
            height: '40px'
          }
        }}
        placeholder="Search Services..."
        sx={{
          background: 'rgba(229, 229, 229, 0.37)',
          borderRadius: '6px',
          '& .MuiOutlinedInput-notchedOutline': {
            border: '0'
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              style={{ height: 'auto', marginTop: '0' }}
            >
              <SearchIcon size="large" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={() => setQuery('')}
              style={{ height: 'auto' }}
            >
              {!!query && <ClearIcon />}
            </InputAdornment>
          )
        }}
      ></TextField>
    </FormControl>
  </Box>
)

export default SearchServiceInput
