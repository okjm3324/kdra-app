import { Box, Grid, Container, Pagination } from '@mui/material'
import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Loading from '@/components/atoms/Loading'
import SpotCard from '@/components/organisms/SpotCard'
import Error from '@/components/templates/Error'
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
  const router = useRouter()
  const page = 'page' in router.query ? Number(router.query.page) : 1
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/spots/?page=' + page

  const { data, error } = useSWR(url, fetcher)
  if (error) return <Error />
  if (!data) return <Loading />

  const spots = camelcaseKeys(data.spots)
  const meta = camelcaseKeys(data.meta)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push('/?page=' + value)
  }
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
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <Pagination
            count={meta.totalPages}
            page={meta.currentPage}
            onChange={handleChange}
          />
        </Box>
      </Container>
    </Box>
  )
}

export default Index
