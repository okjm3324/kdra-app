import { GoogleMap, useLoadScript, MarkerF,useJsApiLoader, } from '@react-google-maps/api'
import { useCallback, useRef, useState } from 'react'
import { InterfaceMap } from '../../styles/googleMapStyles'
import PlaceInfo from './Placeinfo'
import usePlacesAutoComplete, {getGeoCode, getLatLng} from 'use-places-autocomplete'
import { Input, Popover } from '@mui/material'
import SearchLocation from './SearchLocation'
const googleMapOptions = {
  styles: InterfaceMap,
}
const libraries: 'places'[] = ['places']
const options = {
  styles: InterfaceMap,
  disableDefaultUI: true,
  zoomControl: true,
  scrollwheel: true,
}
const defaultLatLng = {
  lat: 37.55612564086914,
  lng: 126.97232055664062,
}
const containerStyle = {
  width: '100%',
  height: '400px',
  //地図の幅と高さを連想配列にします。
  //ちなみにこのライブラリの地図はmapContainerStyleイベントでしか
  //サイズ変更できません(多分)
}
const marking = {
  lat: 33,
  lng: 33,
}

type Marker = {
  lat: number
  lng: number
}

type MapProps = {
  spots?: {
    latitude: number
    longitude: number
    name: string
  }[]
  onClickSetLatLng: (lat: number, lng: number) => void
}

const Map: React.FC<MapProps> = ({ spots, onClickSetLatLng  }) => {
  const [coordinates, setCoordinates] = useState({lat: 37.55612564086914, lng: 126.97232055664062})
  const [marker, setMarker] = useState<Marker | null>(null)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
    language: 'ja',
    libraries,
  })
  const mapRef = useRef<google.maps.Map>()
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map
  }, [])

  if (loadError) return 'Error'
  if (!isLoaded) return 'Load中'

  return (
    <>
      <SearchLocation
        setCoordinates={(lat, lng) => {
          setCoordinates({ lat, lng })
          setMarker({ lat, lng })
        }}
        onClickSetLatLng={onClickSetLatLng} //住所を検索し、エンターを押した際にlat lngを取得するため
      />
      <GoogleMap
        options={options}
        center={coordinates}
        zoom={14} //zoomでデフォルトで表示される地図の範囲を指定します。
        mapContainerStyle={containerStyle}
        onClick={(e) => {
          const lat = e.latLng?.lat()
          const lng = e.latLng?.lng()
          if (typeof lat === 'number' && typeof lng === 'number') {
            setMarker({ lat: lat, lng: lng })
            onClickSetLatLng(lat, lng)
          }
        }}
      >
        {marker && marker.lat !== undefined && marker.lng !== undefined && (
          <MarkerF position={{ lat: marker.lat, lng: marker.lng }} />
        )}
      </GoogleMap>
    </>
  )
}
export default Map
