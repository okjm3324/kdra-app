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
import DramaCard from './DramaCard'
import { LoadingButton } from '@mui/lab'
import axios, { AxiosResponse, AxiosError } from 'axios'
import React from 'react'
import Error from '../templates/Error'
import { idText } from 'typescript';

const SearchSelectBox = () => {
  //テスト
  const createUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/dramas'
  const headers = { 'Content-Type': 'application/json' }
  //テスト終わり
  //Draamの詳細を取得するためのステイト
  const [dramaDetail, setDramaDetail] = useState(null)
  const [open, setOpen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const url = `http://localhost:3000/api/v1/dramas/search_drama?keyword=${keyword}`
  const poster_url = 'https://image.tmdb.org/t/p/w500'
  const { data, error, isValidating } = useSWR(url, fetcher)
  const isLoading = isValidating //ボタンのローディングに使用
  //dramaレコード新規作成関数
  const addDrama = async (drama) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/drama', {
        tmdb_id: drama.id,
        title: drama.name,
        original_title: drama.original_name,
        first_air_day: frist_air_day,
        total_ep: epsode_number,
        poster_url: drama.poster_url,


      })
    } catch (error) {
      return <Error />
    }
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
  //キーワード検索関数
  const onClickDataFetch = () => {
    const newKeyword = getValues().single ? getValues().single.toString() : ''
    setKeyword(newKeyword)
    const newUrl = `http://localhost:3000/api/v1/dramas/search_drama?keyword=${newKeyword}`
    mutate(newUrl)
  }
  //Dramaレコードの作成ハンドラ
  const onClickCreateDrama = (dramaDetail) => {
    axios({
      method: 'POST',
      url: createUrl,
      data: { drama: {...dramaDetail} },
      headers: headers,
    })
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.error(error)
    })
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
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="drama"
                      onChange={(event) => {
                        setValue('single', event.target.value, {
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
      <Button
        onClick={()=> onClickCreateDrama(dramaDetail)}
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
        ドラマ追加
      </Button>
      <DramaCard setDramaDetail={setDramaDetail}/>
      <p>{dramaDetail ? dramaDetail.title : 'ありません'}</p>
    </>
  )
}
export default SearchSelectBox
