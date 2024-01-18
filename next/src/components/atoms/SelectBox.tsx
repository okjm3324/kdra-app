import { FormControl, Select, InputLabel, MenuItem } from '@mui/material'

const SelectBox = ({ episodeNumber, selectedEpisode, setSelectedEpisode }) => {
  const handleChange = (e) => {
    console.log('changed')
    setSelectedEpisode(e.target.value)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Episode</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedEpisode}
        label="Episode"
        onChange={handleChange}
      >
        {Array.from({ length: episodeNumber }, (_, index) => (
          <MenuItem key={index + 1} value={index + 1}>
            {index + 1}話
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
export default SelectBox
