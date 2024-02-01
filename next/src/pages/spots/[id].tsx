import ArticleIcon from '@mui/icons-material/Article'
import PersonIcon from '@mui/icons-material/Person'
import UpdateIcon from '@mui/icons-material/Update'
import {
  Box,
  Container,
  Typography,
  Card,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Loading from '@/components/atoms/Loading'
import Map from '@/components/atoms/Map'
import Error from '@/components/templates/Error'
import { fetcher } from '@/utils'

type SpotProps = {
  name: string
  address: string
  latitude: number
  longitude: number
  createdAt: string
  updatedAt: string
  user: {
    name: string
  }
}

const SpotDetail: NextPage = () => {
  const router = useRouter()
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/spots/'
  const { id } = router.query

  const { data, error } = useSWR(id ? url + id : null, fetcher)
  if (error) return <Error />
  if (!data) return <Loading />

  const spot: SpotProps = camelcaseKeys(data)

  return (
    <Box
      sx={{
        backgroundColor: '#EDF2F7',
        pb: 6,
        minHeight: 'calc(100vh - 57px)',
        color: 'blue',
      }}
    >
      <Box
        sx={{
          display: { xs: 'flex', lg: 'none' },
          alignItems: 'center',
          backgroundColor: 'white',
          borderTop: '0.5px solid #acbcc7',
          height: 56,
          pl: 4,
          color: 'red',
        }}
      >
        <Typography>{spot.name}</Typography>
      </Box>

      <Button
        color="primary"
        variant="contained"
        sx={{
          color: 'white',
          textTransform: 'none',
          fontSize: 16,
          borderRadius: 2,
          boxShadow: 'none',
        }}
      >
        Go!
      </Button>
    </Box>
  )
}
export default SpotDetail
