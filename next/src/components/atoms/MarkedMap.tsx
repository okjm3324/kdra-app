import { Input, Popover } from '@mui/material'
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  useJsApiLoader,
  Circle,
} from '@react-google-maps/api'
import { useCallback, useRef, useState, useEffect } from 'react'
import usePlacesAutoComplete from 'use-places-autocomplete'
import Modal from '../../components/molecules/Modal'
import useLocationWithFallback from '../../hooks/useLocationWithFallback'
import { InterfaceMap } from '../../styles/googleMapStyles'
import { Spot } from '../../types/spot'
import SpotDetailContent from '../organisms/SpotDetailContent'

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

const containerStyle = {
  width: '100%',
  height: '400px',
  //地図の幅と高さを連想配列にします。
  //ちなみにこのライブラリの地図はmapContainerStyleイベントでしか
  //サイズ変更できません(多分)
}
type Marker = {
  lat: number
  lng: number
}

type MapProps = {
  spots?: Spot[]
  selectedDramaId?: number | null
}

const MarkedMap: React.FC<MapProps> = ({ spots = [], selectedDramaId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clickedMarker, setClickedMarker] = useState<Spot | null>(null)
  const location = useLocationWithFallback()
  const [marker, setMarker] = useState<Marker | null>(null)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
    language: 'ja',
    libraries,
  })
  useEffect(() => {
    console.log('spots prop has changed:', spots)
  }, [spots])
  const mapRef = useRef<google.maps.Map>()
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map
  }, [])
  if (loadError) return 'Error'
  if (!isLoaded) return 'Load中'
  const handleOpenModal = (): void => {
    setIsModalOpen(true)
  }

  const handleCloseModal = (): void => {
    setIsModalOpen(false)
    setClickedMarker(null)
  }

  //clickedMarkerセッター
  const setterClickedMarker = (spot: Spot) => {
    setClickedMarker(spot)
    console.log(spot)
    handleOpenModal()
  }
  console.log(location)

  return (
    <>
      <GoogleMap
        options={options}
        center={location}
        zoom={14} //zoomでデフォルトで表示される地図の範囲を指定します。
        mapContainerStyle={containerStyle}
      >
        {/* 現在地を示すマーカー */}
        <MarkerF
          position={location}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7, // 円のサイズ
            fillColor: '#4285F4', // 円の色
            fillOpacity: 1, // 円の不透明度
            strokeWeight: 2, // 円の境界線の太さ
            strokeColor: '#FFFFFF', // 円の境界線の色
          }}
        />
        {spots &&
          spots
            .filter((spot) => {
              const shouldDisplay =
                selectedDramaId === null || spot.dramaId === selectedDramaId
              return shouldDisplay
            })
            .map((spot) => {
              console.log(spot)
              if (spot.status === 'unsaved') return null
              return (
                <MarkerF
                  key={spot.id}
                  position={{ lat: spot.latitude, lng: spot.longitude }}
                  onClick={() => setterClickedMarker(spot)}
                />
              )
            })}
      </GoogleMap>
      {isModalOpen && (
        <Modal title={'詳細'} open={isModalOpen} onClose={handleCloseModal}>
          <SpotDetailContent spot={clickedMarker} location={location} />
        </Modal>
      )}
    </>
  )
}

export default MarkedMap
