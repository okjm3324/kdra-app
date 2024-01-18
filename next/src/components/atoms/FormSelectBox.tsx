import { Select, MenuItem } from '@mui/material';

const FormSelectBox = ({ episodeNumber, value, onChange }) => {
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
  );
};

export default FormSelectBox;