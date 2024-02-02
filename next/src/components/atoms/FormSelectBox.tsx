import { Select, MenuItem, SelectChangeEvent } from '@mui/material'

interface FormSelectBoxProps {
  episodeNumber: number
  value: any
  onChange: (event: SelectChangeEvent) => void
}

const FormSelectBox: React.FC<FormSelectBoxProps> = ({
  episodeNumber,
  value,
  onChange,
}) => {
  return (
    <Select
      id="episode-select"
      value={value}
      onChange={onChange}
      fullWidth // 親コンテナの全幅を取る
    >
      {Array.from({ length: episodeNumber }, (_, index) => (
        <MenuItem key={index + 1} value={index + 1}>
          {index + 1}話
        </MenuItem>
      ))}
    </Select>
  )
}

export default FormSelectBox
