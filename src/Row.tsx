import React from 'react'
import { Autocomplete, TextField } from '@mui/material';

export default function Row() {
  const chars = ['']
  return (
    <>
      <div className='row'>
        <select name="text-type" id="">
          <option value="Dialogue">Dialogue</option>
          <option value="Narrator">Narrator</option>
        </select>
        <input className='input' type="text" />
      </div>
      {/* <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setValue({
              title: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
              title: newValue.inputValue,
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option.title);
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              title: `Add "${inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={chars}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.title;
        }}
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Choose name" />
        )}
      /> */}
      {/* <div>
        <Autocomplete
          disablePortal
          id='speaker'
          options={chars}
          sx={{ width: 300 }}
          freeSolo
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          renderInput={(params) => <TextField {...params} label='Choose name' />}
        />
      </div> */}
    </>
  )
}
