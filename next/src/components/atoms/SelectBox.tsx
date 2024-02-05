import { FormControl, Select, InputLabel, MenuItem } from '@mui/material'

const SelectBox = ({
  episodeNumber,
  selectedEpisode,
  setSelectedEpisode,
}: {
  episodeNumber: number
  selectedEpisode: number
  setSelectedEpisode: (value: number) => void
}) => {
  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedEpisode(e.target.value as number)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Episode</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedEpisode}
        label="Episode"
        onChange={(event) =>
          handleChange(event as React.ChangeEvent<{ value: unknown }>)
        }
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
