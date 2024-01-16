import { LoadingButton } from '@mui/lab'
import {
  Grid,
  Button,
  Box,
  TextField,
  Autocomplete,
  Typography,
  Card,
  CardMedia,
} from '@mui/material'
import axios, { AxiosResponse, AxiosError } from 'axios'
import type { NextPage } from 'next'
import React from 'react'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import useSWR, { mutate } from 'swr'
import Modal from '../../components/molecules/Modal'
import DramaCard from '../components/molecules/DramaCard'
import CreateDramaContent from '@/components/organisms/CreateDramaContent'
import { fetcher } from '@/utils'

const dramaData: string[] = [
  'ウ・ヨンウ弁護士は天才肌',
  'シスターズ',
  '無人島',
  'トッケビ',
  'スタートアップ',
  '二十五、二一',
  '他人は地獄だ',
  '梨泰院クラス',
]

const CreateSpot: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string>('')
  const url: string = `http://localhost:3000/api/v1/dramas/search_drama?keyword=${keyword}`
  const poster_url: string = 'https://image.tmdb.org/t/p/w500'
  const { data, error, isValidating } = useSWR(url, fetcher)
  const isLoading: boolean = isValidating
  //モーダルのため
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const handleOpenModal = (): void => {
    setModalOpen(true)
  }

  const handleCloseModal = (): void => {
    setModalOpen(false)
  }
  if (error) {
    console.error(error)
  }
  const { control, handleSubmit, setValue, getValues } = useForm({
    mode: 'onChange',
    defaultValues: {
      single: {},
      multi: [],
    },
  })
  const handleClickOpen = (): void => {
    setOpen(true)
  }
  const handleClose = (): void => {
    setOpen(false)
  }
  const onClickDataFetch = (): void => {
    const newKeyword: string = getValues().single.toString()
    setKeyword(newKeyword)
    const newUrl: string = `http://localhost:3000/api/v1/dramas/search_drama?keyword=${newKeyword}`
    mutate(newUrl)
  }
  return (
    <>
      <div style={{ padding: 30 }}></div>
      <Box>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          justifyContent="left"
        >
          <Grid item xs={1} sm={1} md={1} lg={1} xl={1}></Grid>
          <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
            <>
              <form onSubmit={handleSubmit(handleClickOpen)}>
                <Typography gutterBottom variant="h4" component="h2">
                  Drama Select
                </Typography>
                <Controller
                  control={control}
                  name="single"
                  render={({ props }) => (
                    <Autocomplete
                      fullWidth
                      options={dramaData}
                      renderInput={(params) => <TextField {...params} label="Movie" />}
                      onChange={(event, value) => {
                        setValue('single', value, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        })
                      }}
                    />
                  )}
                />
                <Box sx={{ mt: 5 }} />
              </form>
            </>
          </Grid>
        </Grid>
      </Box>
      <Button variant="contained" onClick={handleOpenModal}>
        ドラマを追加する
      </Button>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <CreateDramaContent setModalOpen={setModalOpen} />
      </Modal>
      <LoadingButton
        variant="contained"
        onClick={onClickDataFetch}
        SetModalOpen={setModalOpen}
        loading={isLoading}
        sx={{ fontWeight: 'bold', color: 'white' }}
      >
        検索
      </LoadingButton>
      <Box>
        <Box>
          {data &&
            data.map((item: any, index: number) => (
              <React.Fragment key={index}>
                <div>{item.id}</div>
                <div>{item.name}</div>
                <div>{item.original_name}</div>
                <Card>
                  <CardMedia
                    component="img"
                    height="500"
                    image={poster_url + item.poster_path}
                    alt={item.name}
                  />
                  {/* 他のCardコンポーネント（CardHeader、CardContentなど） */}
                </Card>
                <div>{item.first_air_date}</div>
              </React.Fragment>
            ))}
        </Box>
      </Box>
    </>
  )
}
export default CreateSpot
