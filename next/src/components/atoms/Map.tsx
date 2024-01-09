import { GoogleMap, useLoadScript, MarkerF,useJsApiLoader } from '@react-google-maps/api'
import { useCallback, useRef, useState } from 'react'
import { InterfaceMap } from '../../styles/googleMapStyles'
import PlaceInfo from './Placeinfo'
const googleMapOptions = {
  styles: InterfaceMap,
}
const libraries = ['places']
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

const Map = ({spots}) => {
  const [ markers, setMarkers ] = useState([])
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBe8mCZ8h2vnUEqjIH3Gy7FXgdjGlkQKH8',
    language: 'ja',
    libraries,
  })
  const mapRef = useRef<google.maps.Map>()
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map
  }, [])
  const onClickSpot = () => {
    console.log('clicked')
  }
  if (loadError) return 'Error'
  if (!isLoaded) return 'Load中'
  return (
    <>
      <GoogleMap
        options={options}
        center={defaultLatLng}
        zoom={14} //zoomでデフォルトで表示される地図の範囲を指定します。
        mapContainerStyle={containerStyle}
        onClick={(e) => {
          setMarkers(current => [
            ...current,
            {
              lat:  e.latLng?.lat(),
              lng: e.latLng?.lng(),
            }
          ])
        }}
      >
        {spots.map( spot => {
          console.log(spot.latitude)
          return <MarkerF key={spot.name} position={{ lat: spot.latitude, lng: spot.longitude}} label={ spot.name }/>
        })}
        { markers.map((marker, index) => {
          return (
          <MarkerF 
                  key={index}
                  position={{ lat:marker.lat, lng:marker.lng}}
           />
           )
        })}
         <PlaceInfo />
      </GoogleMap>
    </>
  )
}
export default Map
