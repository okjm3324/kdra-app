// SearchLocation.tsx
import { type } from 'os'
import { Autocomplete, TextField } from '@mui/material'
import React from 'react'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import { reverseGeocode } from '@/utils/geocode'

type SearchLocationProps = {
  setCoordinates: (lat: number, lng: number) => void
  onClickSetLatLng: (lat: number, lng: number) => void
  setAddress: (address: string) => void
}

const SearchLocation: React.FC<SearchLocationProps> = ({
  setCoordinates,
  onClickSetLatLng,
  setAddress,
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: 'kr' }, // 韓国に限定する
    },
  })

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSelect = async (address: string) => {
    setValue(address, false)
    clearSuggestions()

    try {
      const results = await getGeocode({ address })
      const { lat, lng } = await getLatLng(results[0])
      console.log(lat)
      setCoordinates(lat, lng)
      onClickSetLatLng(lat, lng)
      const formattedAddress = await reverseGeocode(lat, lng)
      setAddress(formattedAddress)
      console.log(formattedAddress)
    } catch (error) {
      if (error === 'ZERO_RESULTS') {
        console.log('結果が見つかりませんでした')
      } else {
        console.error('Error: ', error)
      }
    }
  }

  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={data.map((suggestion) => suggestion.description)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="住所を検索"
          margin="normal"
          variant="outlined"
          onChange={handleInput}
          InputProps={{ ...params.InputProps, type: 'search' }}
        />
      )}
      onInputChange={(event, newInputValue) => {
        handleSelect(newInputValue)
      }}
      onChange={(event, newValue) => {
        if (newValue) {
          handleSelect(newValue)
        }
      }}
    />
  )
}

export default SearchLocation
