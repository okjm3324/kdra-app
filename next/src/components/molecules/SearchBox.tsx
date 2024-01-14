import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
const SearchBox = () => {
  const handleSearch = async () => {
    const dramaName = document.getElementById('dramaSearch')
  }

  return (
  <TextField id="dramaSearch" label="Search Drama" variant="outlined" />
  <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
  )
}
export default SearchBox
