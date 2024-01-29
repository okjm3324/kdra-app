import { Button, Container, Typography,Paper, CardMedia, Box, Link } from "@mui/material"


const SpotDetailContent = ({ spot }) => {
  const imageUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL + spot.key
  const naverUrl = `nmap://route/bicycle?slat=37.5657&slng=126.978&sname=%EC%84%9C%EC%9A%B8%EB%8C%80%ED%95%99%EA%B5%90&dlat=${spot.latitude}&dlng=${spot.longitude}&dname=%EC%98%AC%EB%A6%BC%ED%94%BD%EA%B3%B5%EC%9B%90&appname=com.example.myapp`
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
        <Link href={naverUrl}>
          <Button
            color="primary"
            variant="contained"
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
