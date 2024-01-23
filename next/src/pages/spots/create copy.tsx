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
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import useSWR, { mutate } from 'swr'
import Modal from '../../components/molecules/Modal'
import DramaCard from '../../components/atoms/DramaCard'
import CreateDramaContent from '@/components/organisms/CreateDramaContent'
import { fetcher } from '@/utils'
import SelectBox from '@/components/atoms/SelectBox'
import FormSelectBox from '@/components/atoms/FormSelectBox'

const CreateSpot: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [selectedDrama, setSelectedDrama] = useState(null)
  const [selectedEpisode, setSelectedEpisode] = useState(1)
  const [keyword, setKeyword] = useState<string>('')
  const url: string = `http://localhost:3000/api/v1/dramas/search_drama?keyword=${keyword}`
  const poster_url: string = 'https://image.tmdb.org/t/p/w500'
  const { data, error, isValidating } = useSWR(url, fetcher)
  const isLoading: boolean = isValidating

  const [dramas, setDramas] = useState<Array<{ id: number; tmdb_id: number; title: string; original_title: string; episode_number: number; season_number: number; poster_path: string }>>([]);
  useEffect(() => {
    console.log('実行')
    ;(async () => {
      try {
        console.log('リクエスト前')
        const response = await axios.get('http://localhost:3000/api/v1/dramas/')
        console.log('リクエスト後')
        const newDramas = response.data.map((drama) => ({
          title: drama.title,
          id: drama.id,
          tmdb_id: drama.tmdb_id,
          original_title: drama.original_title,
          poster_path: drama.poster_path,
          episode_number: drama.episode_number,
          season_number: drama.season_number,
        }))
        setDramas(newDramas)
        console.log(newDramas)
      } catch (error) {
        console.error('リクエストエラー', error)
      }
    })()
  }, [])
  //モーダルのため
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const handleOpenModal = (): void => {
    setModalOpen(true)
  }

  const handleCloseModal = (): void => {
    setModalOpen(false)
  }
//フォームの宣言
  const { control, handleSubmit, setValue, getValues } = useForm({
    mode: 'onChange',
    defaultValues: {
      single: {},
      id: null,
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
  //新規ドラマを追加した場合セレクトボックスに反映する関数
  const updateDramaList = (newDrama) => {
    setDramas([...dramas, newDrama])
  }

  //オートコンプリートの関数
  const handleAutocompleteChange = (event, newValue) => {
    // newValue は選択されたドラマオブジェクトです
    setSelectedDrama(newValue)
    setValue('title', newValue.title)
    setValue('id', newValue.id)
    if (newValue !== null) {
      setSelectedDrama(newValue)
    }
  }

  const handleUpdateSpot = () => {
    console.log(getValues())
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
              <form onSubmit={handleSubmit(handleUpdateSpot)}>
                <Typography gutterBottom variant="h4" component="h2">
                  Drama Select
                </Typography>
                <Controller
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      fullWidth
                      options={dramas}
                      getOptionLabel={(option) => option.title}
                      renderInput={(params) => <TextField {...params} label="drama title" />}
                      onChange={handleAutocompleteChange}
                    />
                  )}
                />
                <Box sx={{ mt: 5 }} />
                {selectedDrama && (
                  <>
                  <DramaCard
                    tmdbId={selectedDrama.tmdb_id}
                    posterPath={selectedDrama.poster_path}
                    title={selectedDrama.title}
                    date={selectedDrama.first_air_date}
                  />
              
                <Controller
                  control={control}
                  name="episode"
                  render={({ field }) => (
                      <FormSelectBox episodeNumber={selectedDrama.episode_number } selectedEpisode={field.value}  
                      setSelectedEpisode={(value) => field.onChange(value)} />
                  )}
                />
                </>
                )}
                <input type="submit" />
              </form>
            </>
          </Grid>
        </Grid>
      </Box>
      <Button variant="contained" onClick={handleOpenModal}>
        ドラマを追加する
      </Button>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <CreateDramaContent setModalOpen={setModalOpen} updateDramaList={updateDramaList} />
      </Modal>
      <Box>

      </Box>
    </>
  )
}
export default CreateSpot
