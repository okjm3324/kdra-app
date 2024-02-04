import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import * as React from 'react'

type DramaDetail = {
  title: string
  originalTitle: string
  tmdbId: number
  posterPath: string
  firstAirDate: string
  episodeNumber: number
  seasonNumber: number
}
type DramaProps = {
  tmdbId: number
  title: string
  posterPath: string
  date: string
  selected: boolean
}

type DramaCardProps = DramaProps & {
  setDramaDetail: React.Dispatch<React.SetStateAction<DramaDetail | null>>
  setSelectedTmdbId: React.Dispatch<React.SetStateAction<number | null>>
}
const DramaCard = ({
  tmdbId,
  setDramaDetail,
  posterPath,
  title,
  date,
  selected,
  setSelectedTmdbId,
}: DramaCardProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const poster_url = 'https://image.tmdb.org/t/p/w92'
  const image_path = poster_url + posterPath
  //
  const onClickFetchDetail = async () => {
    setSelectedTmdbId(tmdbId)
    try {
      const res = await axios.get(`${baseUrl}/dramas/detail_drama?id=${tmdbId}`)
      setDramaDetail(res.data)
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Card
      sx={{
        display: 'flex',
        boxShadow: 3,
        backgroundColor: selected ? 'blue' : 'white',
      }}
      onClick={onClickFetchDetail}
      style={{ backgroundColor: selected ? 'lightgray' : 'white' }}
    >
      <CardMedia
        component="img"
        sx={{ width: '94px', height: '141px', objectFit: 'cover' }}
        image={image_path}
        alt="drama image"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography
            component="div"
            variant="h2"
            style={{ fontSize: '16px', fontWeight: 'bold' }}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            style={{ fontSize: '14px' }}
          >
            {date}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  )
}
export default DramaCard
