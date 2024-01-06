import { Box, Grid, Container } from '@mui/material'
import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import Loading from '@/components/atoms/Loading'
import SpotCard from '@/components/organisms/SpotCard'
import { styles } from '@/styles'
import { fetcher } from '@/utils'

type SpotProps = {
  id: number
  name: string
  latitude: number
  longitude: number
  address: string
  createdAt: string
  user: {
    name: string
  }
}
const Index: NextPage = () => {
  const url = 'http://localhost:3000/api/v1/spots'

  const { data, error } = useSWR(url, fetcher)
  if (error) return <div>An error has occurred</div>
  if (!data) return <Loading />

  const spots = camelcaseKeys(data.spots)

  return (
    <Box css={styles.pageMinHeight} sx={{ backgroundColor: '#e6f2ff' }}>
      <Container maxWidth="md" sx={{ pt: 6 }}>
        <Grid container spacing={4}>
          {spots.map((spot: SpotProps, i: number) => (
            <Grid key={i} item xs={12} md={6}>
              <Link href={'/spots/' + spot.id}>
                <SpotCard
                  name={spot.name}
                  userName={spot.user.name}
                  address={spot.address}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Index
