import React from 'react'

import { FormControl, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

const SearchServiceInput = ({ query, setQuery }) => (
  <FormControl>
    <TextField
      value={query}
      onChange={e => setQuery(e.target.value)}
      size="small"
      variant="filled"
      placeholder="Search Services..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
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
)

export default SearchServiceInput
