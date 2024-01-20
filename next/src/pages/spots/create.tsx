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
  styled
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

  //ドロップボックスのため
  const [imageUrl, setImageUrl] = useState('')
  const [imageKey, setImageKey] = useState('')

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      try {
        // 認証情報を取得
        const accessToken = localStorage.getItem('access-token');
        console.log(accessToken)
        const client = localStorage.getItem('client');
        const uid = localStorage.getItem('uid');
        // 認証情報をヘッダーに設定
        const authHeaders = {
          'access-token': accessToken,
          'client': client,
          'uid': uid,
        }
        // POSTリクエストで署名付きURLを取得
        const response = await axios.post('http://localhost:3000/api/v1/images', {}, {
          headers: authHeaders
        });
        console.log(response)
        
        console.log("keyは"+response.data.key)
        console.log("認証URLは"+response.data.signed_url)
        const key = response.data.key
        const signedUrl = response.data.signed_url
  console.log('アップロード開始'+ key + 'と'+ signedUrl)
        // PUTリクエストでファイルをアップロード
        await axios.put(signedUrl, file, {
          headers: {
            'Content-Type': file.type,
          },
        })
 console.log('ここまでok') 
        // GETリクエストで署名付きURLを取得して画像を表示
        const res = await axios.get(`http://localhost:3000/api/v1/images/${key}`, {
          headers: authHeaders
        })
        setImageUrl(res.data.signed_url)
        setImageKey(key)
        console.log('フィニッシュです')
      } catch (error) {
        console.error('ファイルのアップロード中にエラーが発生しました', error)
      }
    })
  }, [])
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
        };
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
  const { control, handleSubmit, setValue, getValues, register, formState: { errors }  } = useForm({
    mode: 'onChange',
    defaultValues: {
      single: {},
      id: null,
      episode: null
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
    if (newValue !== null) {
      setSelectedDrama(newValue)
      setValue('id', newValue.id)
    } else {
      setSelectedDrama(null)
      setValue('id', null)
    }

    if (newValue !== null) {
      setSelectedDrama(newValue)
    }
  }

  const handleUpdateSpot = (data) => {
    const { single, ...formData} = data

    console.log(formData)
  }
  return (
    <>
    <Container style={{ display: 'flex',　flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
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
                    name="single"
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        fullWidth
                        options={dramas}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => (
                          <TextField {...params} label="drama title" />
                        )}
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
                        render={({ field, fieldState }) => (
                          <FormControl fullWidth error={fieldState.invalid}>
                            <InputLabel id="area-label">地域</InputLabel>
                            <Select
                              labelId="area-label"
                              label="地域" // フォーカスを外した時のラベルの部分これを指定しないとラベルとコントロール線が被る
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
          <img src={imageUrl}/>
          {imageKey && <img src={imageUrl} className="h-32 m-4" />}
          <div className="border-dashed border-2 h-32 rounded flex justify-center items-center" {...getRootProps()} >
            <input {...getInputProps()} /><p className="block text-gray-400">Drop the files here ...</p>
          </div>
          <input type="hidden" {...register('key', { required: true })} defaultValue={imageKey} />
          <small className="mb-2 text-red-600 block">{errors.key?.message && <span>This field is required</span>}</small>
        </label>

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
        <Box width={180} height={180}>
        <Paper
          variant="outlined"
          square
          {...getRootProps()}
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            padding: 10,
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <Typography>Drop the files here ...</Typography>
          ) : (
            <Typography>
              Drag 'n' drop some files here, or click to select files
            </Typography>
          )}
        </Paper>
      </Box>
        <Card sx={{ width: 200, height: 200, overflow: 'hidden' }}>
        <CardMedia
          component="img"
          image={imageUrl}
          alt="画像"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </Card>
      </Box>
      </Container>
    </>
  )
}
export default CreateSpot
