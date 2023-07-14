import React from 'react'
import {
  Autocomplete,
  TextField,
  createFilterOptions,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete'

interface CharacterType {
  name: string
  id: number
}
const filter = createFilterOptions<CharacterType>()
const defaultCharacters = ['Juice', 'Harry']
const characterOptions = defaultCharacters.map((name, idx) => ({
  name: name,
  id: idx
}))

export default function Row() {
  const [characters, setCharacters] = React.useState(defaultCharacters)
  const [charValue, setCharValue] = React.useState<CharacterType | null>(null)
  // console.log(characters)

  const deleteChar = (char: string) => {
    const idx = characters.indexOf(char)
    if (idx > -1) {
      setCharacters(characters => [...characters.splice(idx, 1)])
      if (characters.length == 0) {
        setCharValue(null)
      }
      console.log('deleted', char)
      console.log(characters)
    }
  }
  return (
    <>
      <div className='row'>
        {/* <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
          // onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl> */}
        {/* <select name="text-type" id="">
          <option value="Dialogue">Dialogue</option>
          <option value="Narrator">Narrator</option>
        </select>
        <input className='input' type="text" /> */}
        <Autocomplete
          options={characterOptions}
          value={charValue}
          // filterOptions={characters => characters.filter()}
          onChange={(event: any, value: string | { name: string, id: number } | null) => {
            if (typeof value === 'object' && value?.name) {
              const isExisting = characters.some((option) => value.name === option);
              if (!isExisting) {
                setCharacters(characters => [...characters, value.name])
                setCharValue(value)
              }
            }
            // console.log(charValue)
            // if (typeof value === 'string') {
            //   const isExisting = characters.some((option) => value === option);
            //   if (!isExisting) {
            //     setCharacters(characters => [...characters, value])
            //     setCharValue(value)
            //   }
            // }
          }}
          sx={{ width: 300 }}
          freeSolo
          autoSelect
          // renderOption={(props, option) => {
          //   <li {...props}>{option}</li>
          // }}
          // renderOption={(props, option) => {
          //   if (typeof option === 'object' && option?.name) {
          //     <div className="speakerOptionWrapper">
          //       <li {...props}>{option.name}</li>
          //       <IconButton
          //       // onClick={() => deleteChar(option.name)}
          //       >
          //         <DeleteIcon />
          //       </IconButton>
          //     </div>
          //   } else {
          //     <div></div>
          //   }
          // }}
          renderInput={(params) => (
            <TextField {...params} label="Speaker" />
          )}
        ></Autocomplete>
        {/* <Autocomplete
          value={characters[characters.length - 1]}
          onChange={(event, newValue) => {
            console.log(characters)
            if (typeof newValue === 'string') {
              setCharacters((characters) => [...characters, { name: newValue, }]);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const { inputValue } = params;
            // Suggest the creation of a new value
            const isExisting = options.some((option) => inputValue === option.name);
            if (inputValue !== '' && !isExisting) {
              filtered.push({
                name: inputValue,
              });
            }

            return filtered;
          }}
          selectOnFocus
          // clearOnBlur
          handleHomeEndKeys
          id="character-select"
          options={characters}
          getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === 'string') {
              return option;
            }
            // Regular option
            return option.name;
          }}
          renderOption={(props, option) => (
            <div className="speakerOptionWrapper">
              <li {...props}>{option.name}</li>
              <IconButton
                onClick={() => deleteChar(option.name)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          )}
          sx={{ width: 300 }}
          freeSolo
          renderInput={(params) => (
            <TextField {...params} label="Speaker" />
          )}
        /> */}
      </div >
    </>
  )
}
