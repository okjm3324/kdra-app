import { LoadingButton } from '@mui/lab'
import {
  Grid,
  Button,
  Box,
  FormControl,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  Autocomplete,
  Typography,
  FormHelperText,
  Paper,
  Card,
  CardMedia,
  Container,
  styled,
} from '@mui/material'
import axios, { AxiosResponse, AxiosError } from 'axios'
import type { NextPage } from 'next'
import React, { useEffect, useState, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import useSWR, { mutate } from 'swr'
import Modal from '../../components/molecules/Modal'
import DramaCard from '../../components/atoms/DramaCard'
import CreateDramaContent from '@/components/organisms/CreateDramaContent'
import { fetcher } from '@/utils'
import SelectBox from '@/components/atoms/SelectBox'
import FormSelectBox from '@/components/atoms/FormSelectBox'
import {useDropzone} from 'react-dropzone'
import camelcaseKeys from 'camelcase-keys'
import Map from '@/components/atoms/Map'

const StyledImage = styled('img')({
  maxWidth: '100%',
  height: 'auto',
  objectFit: 'contain'
})

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
//フォームの宣言
  const { control, handleSubmit, setValue, getValues, register, formState: { errors }  } = useForm({
    mode: 'onChange',
    defaultValues: {
      single: {},
      drama_id: null,
      episode: null,
      key: null,
      longitude: 0,
      latitude: 0,
    },
  })
  //ドロップボックスのため
  const [imageUrl, setImageUrl] = useState('')
  const [imageKey, setImageKey] = useState('')
  //ドロップボックスの関数
  const onDrop = useCallback((acceptedFiles) => {
      acceptedFiles.forEach(async (file) => {
        try {
          // 認証情報を取得
          const accessToken = localStorage.getItem('access-token')
          const client = localStorage.getItem('client')
          const uid = localStorage.getItem('uid')
          // 認証情報をヘッダーに設定
          const authHeaders = {
            'access-token': accessToken,
            client,
            uid,
          }
          console.log('リクエスト前の認証情報:', {
            accessToken: localStorage.getItem('access-token'),
            client: localStorage.getItem('client'),
            uid: localStorage.getItem('uid'),
          });
          // POSTリクエストで署名付きURLを取得
          const response = await axios.post(
            'http://localhost:3000/api/v1/images',
            {},
            {
              headers: authHeaders,
            },
          )
          console.log('リクエスト後の認証情報:', {
            accessToken: localStorage.getItem('access-token'),
            client: localStorage.getItem('client'),
            uid: localStorage.getItem('uid'),
          });
          const key = response.data.key
          const signedUrl = response.data.signed_url
          // PUTリクエストでファイルをアップロード
          await axios.put(signedUrl, file, {
            headers: {
              'Content-Type': file.type,
            },
          })
          // GETリクエストで署名付きURLを取得して画像を表示
          const res = await axios.get(
            `http://localhost:3000/api/v1/images/${key}`,
            {
              headers: authHeaders,
            },
          )
          //画像のURLをセット
          setImageUrl(res.data.signed_url)
          setImageKey(key)
          setValue('key', key)
        } catch (error) {
          console.error('ファイルのアップロード中にエラーが発生しました', error)
        }
      })
    },
    [setImageUrl, setImageKey, setValue],
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

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
        const headers = {
          'Content-Type': 'application/json',
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client'),
          uid: localStorage.getItem('uid'),
        }
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

  //新規ドラマを追加した場合セレクトボックスに反映する関数
  const updateDramaList = (newDrama) => {
    setDramas([...dramas, newDrama])
  }

  //オートコンプリートの関数
  const handleAutocompleteChange = (event, newValue) => {
    // newValue は選択されたドラマオブジェクトです
    if (newValue !== null) {
      setSelectedDrama(newValue)
      setValue('drama_id', newValue.id)
    } else {
      setSelectedDrama(null)
      setValue('drama_id', null)
    }

    if (newValue !== null) {
      setSelectedDrama(newValue)
    }
  }
  //テストオートコンプリート
  const handleChangeAutoComplete = (value) => {
    console.log("バリュー" + value)
    setSelectedDrama(value)
    console.log("これが"+selectedDrama)
  }

  //formのsubmitを押したときに発火するspotを更新する
  const handleUpdateSpot = async (data) => {
    const { single, ...formData} = data
    console.log("フォームデータ：" +formData)
    const accessToken = localStorage.getItem('access-token')
    const client = localStorage.getItem('client')
    const uid = localStorage.getItem('uid')
    const authHeaders = {
      'access-token': accessToken,
      client,
      uid,
    }
    try {
      const response = await axios({
        method: 'PUT',
        url: 'http://localhost:3000/api/v1/current/spots/35',
        data: formData,
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
        },
      })

      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  const onClickSetLatLng = (lat, lng) => {
    setValue('latitude', lat)
    setValue('longitude', lng)
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
    <Container maxWidth="sm">
        <div style={{ padding: 30 }}></div>
        <Box>
        {/* <Autocomplete
      id="combo-box-demo"
      options={dramas}
      getOptionLabel={(option) => option.title || ''}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined"  label="drama title"/>}
      onChange={(e,value)=>handleChangeAutoComplete(value)}
    /> */}

          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            justifyContent="left"
          >
            <Grid item xs={1} sm={1} md={1} lg={1} xl={1}></Grid>
            <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
              <>
                <form onSubmit={handleSubmit(handleUpdateSpot)}>
                  <Typography gutterBottom variant="h4" component="h2">
                    Drama Select
                  </Typography>
                  <input type="hidden" {...register('drama_id')}  />
                  <Controller
                    control={control}
                    name="single"
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        fullWidth
                        options={dramas}
                        getOptionLabel={(option) => option.title || ''}
                        renderInput={(params) => (
                          <TextField {...params} label="drama title" />
                        )}
                        onChange={handleAutocompleteChange}
                      />
                    )}
                  />
                  <Box sx={{ textAlign: 'right', mt:0.5 }}>
                    <Button variant="contained" onClick={handleOpenModal}>
                      ドラマがない場合
                    </Button>
                  </Box>
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
                        render={({ field, fieldState }) => (
                          <FormControl fullWidth error={fieldState.invalid}>
                            <InputLabel id="area-label">エピソード</InputLabel>
                            <Select
                              labelId="area-label"
                              label="エピソード" // フォーカスを外した時のラベルの部分これを指定しないとラベルとコントロール線が被る
                              {...field}
                            >
                              <MenuItem value="" sx={{color:'gray'}}>
                                未選択
                              </MenuItem>
                              {Array.from({ length: selectedDrama.episode_number }, (_, index) => (
                                  <MenuItem key={index + 1} value={index + 1}>
                                    {index + 1}話
                                  </MenuItem>
                                ))
                              }
                            </Select>
                            <FormHelperText>
                              {fieldState.error?.message}
                            </FormHelperText>
                          </FormControl>
                        )}
                      />
                      <Controller
                        control={control}
                        name="name"
                        render={( {field} ) => ( 
                         <TextField 
                            {...field}
                            label="スポット名"
                            variant="outlined"
                          />
                        )}
                      />
                    </>
                  )}

                  <label className="block mb-4">
                    <span>画像</span>
                    {imageKey && (
                      <Card sx={{ width: 200, height: 200, overflow: 'hidden' }}>
                        <CardMedia
                          component="img"
                          image={imageUrl}
                          alt="画像"
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </Card>
                    )}
        </label>



        <Controller
        control={control}
        name="files"
        defaultValue={[]}
        render={({ field: { onChange, onBlur, value } }) => {
          const { getRootProps, getInputProps } = useDropzone({
            onDrop,
            onBlur,
            onChange: event => {
              onChange(event);
              onDrop(event.target.files);
            }
          });

          return (
            <Paper
              variant="outlined"
              {...getRootProps()}
              sx={{
                border: '2px dashed #c5cae9',
                bgcolor: 'background.paper',
                p: 2,
                mb: 2,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: '#e8eaf6',
                },
              }}
            >
              <input {...getInputProps()} />
              <Typography>スポットの画像をここにドロップ、またはクリックして選択してください。</Typography>
            </Paper>
          );
        }}
      />
      <input type="hidden" {...register('key', { required: true })} defaultValue={imageKey} />
      {errors.key && <Typography color="error">This field is required</Typography>}
        



<Map onClickSetLatLng={onClickSetLatLng} />
                  <input type="submit" />
                </form>
              </>
            </Grid>
          </Grid>
        </Box>

        <Modal open={modalOpen} onClose={handleCloseModal}>
          <CreateDramaContent setModalOpen={setModalOpen} updateDramaList={updateDramaList} />
        </Modal>
      </Container>
    </>
  )
}
export default CreateSpot
