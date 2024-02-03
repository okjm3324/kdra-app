import { Button, Container, Typography,Paper, CardMedia, Box, Link } from "@mui/material"
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import TrainIcon from '@mui/icons-material/Train'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
import { useState, useEffect } from 'react'
import { Spot } from '../../types/spot'

const SpotDetailContent = ({
  spot,
  location,
}: {
  spot: Spot
  location: any
}) => {
  const [selectedIcon, setSelectedIcon] = useState('public')
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL + spot.key
  //const naverUrl = `nmap://route/${selectedIcon}?slat=37.5657&slng=126.978&sname=%EC%84%9C%EC%9A%B8%EB%8C%80%ED%95%99%EA%B5%90&dlat=${spot.latitude}&dlng=${spot.longitude}&dname=${spot.name}&appname=com.example.myapp`
 // const naverUrl = `nmap://route/${selectedIcon}?slat=37.5657&slng=126.978&sname=%EC%84%9C%EC%9A%B8%EB%8C%80%ED%95%99%EA%B5%90&dlat=${spot.latitude}&dlng=${spot.longitude}&dname=%EC%98%AC%EB%A6%BC%ED%94%BD%EA%B3%B5%EC%9B%90&appname=com.example.myapp`
  const [naverUrl, setNaverUrl] = useState('')
  useEffect(() => {
    const timestamp = new Date().getTime()
    setNaverUrl(`nmap://route/${selectedIcon}?slat=${location.lat}&slng=${location.lng}&sname=%EC%84%9C%EC%9A%B8%EB%8C%80%ED%95%99%EA%B5%90&dlat=${spot.latitude}&dlng=${spot.longitude}&dname=${spot.name}&appname=kandramap`)
  }, [selectedIcon, spot])
console.log(naverUrl)
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h6">{spot.name}</Typography>
        <Paper>
          <CardMedia
            component="img"
            sx={{
              width: '200px',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
            image={imageUrl}
            alt="drama image"
          />
        </Paper>
        <Box sx={{display: 'flex', flexDirection: 'row', width: 200, justifyContent: 'space-between'}}>
          <TrainIcon color={selectedIcon === 'public' ? 'primary' : 'disabled'} onClick={() => setSelectedIcon('public')} />
          <DirectionsCarIcon color={selectedIcon === 'car' ? 'primary' : 'disabled'} onClick={() => setSelectedIcon('car')} />
          <DirectionsWalkIcon color={selectedIcon === 'walk' ? 'primary' : 'disabled'} onClick={() => setSelectedIcon('walk')} />
          <DirectionsBikeIcon color={selectedIcon === 'bicycle' ? 'primary' : 'disabled'} onClick={() => setSelectedIcon('bicycle')} />
        </Box>
        <Link href={naverUrl}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => console.log(naverUrl)}
            sx={{
              color: 'white',
              textTransform: 'none',
              fontSize: 16,
              borderRadius: 2,
              width: 100,
              boxShadow: 'none',
              mt: 2,
            }}
          >
            NaverMapへGo
          </Button>
        </Link>
      </Box>
    </Container>
  )
}

export default SpotDetailContent
