import {
  Box,
  Grid,
  Container,
  Pagination,
  Select,
  MenuItem,
  Typography,
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { Drama } from '../types/drama'
import Loading from '@/components/atoms/Loading'
import Map from '@/components/atoms/Map'
import MarkedMap from '@/components/atoms/MarkedMap'
import SpotCard from '@/components/organisms/SpotCard'
import Error from '@/components/templates/Error'
import { styles } from '@/styles'
import { fetcher } from '@/utils'

const Index: NextPage = () => {
  const router = useRouter()
  const page = 'page' in router.query ? Number(router.query.page) : 1
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/spots/?page=' + page
  const [selectedDramaId, setSelectedDramaId] = useState<number | null>(null)
  const [dramas, setDramas] = useState<Drama[]>([])
  useEffect(() => {
    ;(async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_BASE_URL + '/dramas/',
        )
        const newDramas = response.data.map((drama: Drama) => ({
          title: drama.title,
          id: drama.id,
          tmdb_id: drama.tmdb_id,
          original_title: drama.original_title,
          poster_path: drama.poster_path,
          episode_number: drama.episode_number,
          season_number: drama.season_number,
        }))
        setDramas(newDramas)
        // newDramasをstateや適切な場所に保存します
      } catch (error) {
        console.error('リクエストエラー', error)
      }
    })()
  }, [])
  //スポットを取得
  const { data, error } = useSWR(url, fetcher)
  if (error) return <Error />
  if (!data) return <Loading />

  const spots = camelcaseKeys(data.spots)
  console.log(spots)
  const meta = camelcaseKeys(data.meta)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push('/?page=' + value)
  }

  const handleDramaChange = (event: SelectChangeEvent) => {
    const value = event.target.value
    setSelectedDramaId(value === '' ? null : Number(value))
  }
  return (
    <Box css={styles.pageMinHeight} sx={{ backgroundColor: '#e6f2ff' }}>
      <Container maxWidth="md" sx={{ pt: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Select
            value={selectedDramaId !== null ? selectedDramaId.toString() : ''}
            onChange={handleDramaChange}
            displayEmpty
            sx={{
              width: '200px',
              backgroundColor: '#fff',
              marginBottom: '20px',
            }}
          >
            <MenuItem value={''}>ドラマを選択</MenuItem>
            {dramas.map((drama) => {
              return (
                <MenuItem key={drama.id} value={drama.id}>
                  {drama.title}
                </MenuItem>
              )
            })}
          </Select>
        </Box>
        <MarkedMap spots={spots} selectedDramaId={selectedDramaId} />
        {/* <Grid container spacing={4}>
          {spots.map((spot: SpotProps, i: number) => (
            <Grid key={i} item xs={12} md={6}>
              <Link href={'/spots/' + spot.id}>
                <SpotCard
                  name={spot.name}
                  userName={spot.user.name}
                  address={spot.address}
                  latitude={spot.latitude}
                  longitude={spot.longitude}
                  imageKey={spot.key}
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
        </Box>*/}
      </Container>
    </Box>
  )
}

export default Index
