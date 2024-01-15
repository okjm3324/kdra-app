import {
  Grid,
  Button,
  Box,
  TextField,
  Autocomplete,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  CardMedia,
} from '@mui/material';
import useSWR, { mutate } from "swr"
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react'
import camelcaseKeys from 'camelcase-keys'
import { fetcher } from '@/utils'
import Link from 'next/link'
import type { NextPage } from 'next'
import DramaCard from '../components/molecules/DramaCard'
import { LoadingButton } from '@mui/lab'
import axios, { AxiosResponse, AxiosError } from 'axios'
import React from 'react'
import Modal from '../../components/molecules/Modal'
import SearchSelectBox from '@/components/atoms/SearchSelectBox'

const dramaData = [
  'ウ・ヨンウ弁護士は天才肌',
  'シスターズ',
  '無人島',
  'トッケビ',
  'スタートアップ',
  '二十五、二一',
  '他人は地獄だ',
  '梨泰院クラス',
]

const CreateSpot = () => {
  const [open, setOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const url = `http://localhost:3000/api/v1/dramas/search_drama?keyword=${keyword}`
  const poster_url = 'https://image.tmdb.org/t/p/w500'
  const { data, error, isValidating } = useSWR(url, fetcher)
  const isLoading = isValidating
  //モーダルのため
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
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
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const onClickDataFetch = () => {
    const newKeyword = getValues().single.toString()
    setKeyword(newKeyword)
    const newUrl = `http://localhost:3000/api/v1/dramas/search_drama?keyword=${newKeyword}`
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
        <SearchSelectBox />
      </Modal>
      <LoadingButton
        variant="contained"
        onClick={onClickDataFetch}
        loading={isLoading}
        sx={{ fontWeight: 'bold', color: 'white' }}
      >
        検索
      </LoadingButton>
      <Box>
        <Box>
          {data &&
            data.map((item, index) => (
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
