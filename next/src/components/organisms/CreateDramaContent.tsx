import { LoadingButton } from '@mui/lab'
import { Grid, Button, Box, TextField, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState, Dispatch, SetStateAction } from 'react'
import { useForm, Controller } from 'react-hook-form'
import useSWR, { mutate } from 'swr'
import DramaCard from '../atoms/DramaCard'
import { useSnackbarState } from '@/hooks/useGlobalState'
import { fetcher } from '@/utils'

interface CreateDramaContentProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>
  updateDramaList: (drama: any) => void
}
interface DramaCardProps {
  setDramaDetail: (detail: any) => void
  setSelectedTmdbId: (id: number | null) => void
  tmdbId: number | null
  posterPath: string
  title: string
  date: string
  selected: boolean
}
type DramaDetail = {
  title: string
  originalTitle: string
  tmdbId: number
  posterPath: string
  firstAirDate: string
  episodeNumber: number
  seasonNumber: number
}
const CreateDramaContent = ({
  setModalOpen,
  updateDramaList,
}: CreateDramaContentProps) => {
  //現在のパスを取得するために使用
  const router = useRouter()
  //メッセージの表示に使用
  const [snackbar, setSnackbar] = useSnackbarState()
  //テスト
  const createUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/dramas'
  const headers = { 'Content-Type': 'application/json' }
  //テスト終わり
  //Draamの詳細を取得するためのステイト
  const [dramaDetail, setDramaDetail] = useState<DramaDetail | null>(null)
  const [selectedTmdbId, setSelectedTmdbId] = useState<number>(0)
  const [keyword, setKeyword] = useState('')
  const url =
    process.env.NEXT_PUBLIC_API_BASE_URL +
    `/dramas/search_drama?keyword=${keyword}`
  const { data, error, isValidating } = useSWR(url, fetcher)
  const isLoading = isValidating //ボタンのローディングに使用
  //テーマカラーの取得
  const theme = useTheme()
  const primaryColor = theme.palette.primary.main

  if (error) {
    console.error(error)
  }
  const { control, setValue, getValues } = useForm({
    mode: 'onChange',
    defaultValues: {
      single: '',
    },
  })
  //キーワード検索関数
  const onClickDataFetch = () => {
    const newKeyword = getValues().single ? getValues().single.toString() : ''
    setKeyword(newKeyword)
    const newUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL +
      `/dramas/search_drama?keyword=${newKeyword}`
    mutate(newUrl)
  }
  //Dramaレコードの作成ハンドラ
  const onClickCreateDrama = (dramaDetail: any) => {
    axios({
      method: 'POST',
      url: createUrl,
      data: { drama: { ...dramaDetail } },
      headers: headers,
    })
      .then((response) => {
        console.log(response.data)
        setSnackbar({
          message: 'ドラマを追加しました',
          severity: 'success',
          pathname: router.pathname,
        })
        updateDramaList(response.data)
        setModalOpen(false)
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setSnackbar({
            message: error.response.data.message,
            severity: 'error',
            pathname: router.pathname,
          })
        } else {
          // 一般的なエラーメッセージを使用してスナックバーの状態を更新
          setSnackbar({
            message: 'ドラマの追加に失敗しました。',
            severity: 'error',
            pathname: router.pathname,
          })
        }
      })
  }

  return (
    <>
      <div style={{ padding: 30 }}></div>
      <Typography gutterBottom variant="h5" component="h2">
        新しいドラマの追加
      </Typography>
      <Box
        sx={{
          display: 'flex', // flexレイアウトを適用
          alignItems: 'center',
          margin: 'auto',
          justifyContent: 'center',
        }}
      >
        <Controller
          control={control}
          name="single"
          render={({ field }) => (
            <TextField
              {...field}
              label="drama"
              sx={{ width: '300px' }}
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
        <LoadingButton
          variant="contained"
          onClick={onClickDataFetch}
          loading={isLoading}
          size="large"
          sx={{
            height: '56px',
            fontWeight: 'bold',
            color: 'white',
            marginLeft: 0.5,
          }}
        >
          検索
        </LoadingButton>
      </Box>
      <div style={{ padding: 10 }}></div>
      <Box>
        {data && data.length > 0 ? (
          <>
            <Box
              sx={{
                flexGrow: 1,
                padding: 2,
                bgcolor: primaryColor,
                borderRadius: '5px',
                margin: 1,
              }}
            >
              <Grid container spacing={2}>
                {data &&
                  data.map(
                    (
                      item: {
                        id: number | null
                        poster_path: string
                        name: string
                        first_air_date: string
                      },
                      index: React.Key | null | undefined,
                    ) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <React.Fragment key={index}>
                          <DramaCard
                            setDramaDetail={setDramaDetail}
                            setSelectedTmdbId={setSelectedTmdbId}
                            tmdbId={item.id ?? 0}
                            posterPath={item.poster_path}
                            title={item.name}
                            date={item.first_air_date}
                            selected={selectedTmdbId === item.id}
                          />
                        </React.Fragment>
                      </Grid>
                    ),
                  )}
              </Grid>
            </Box>
            <div style={{ padding: 10 }}></div>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                onClick={() => onClickCreateDrama(dramaDetail)}
                color="primary"
                disabled={!dramaDetail}
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
            </Box>
          </>
        ) : (
          <></>
        )}
      </Box>
    </>
  )
}
export default CreateDramaContent
