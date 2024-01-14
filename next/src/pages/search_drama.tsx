import { Box, Container, TextField, Typography, Stack, Grid, Autocomplete, Controller } from '@mui/material'
import useSWR from "swr"
import { useState } from 'react'
import camelcaseKeys from 'camelcase-keys'
import { fetcher } from '@/utils'
import Link from 'next/link'
import type { NextPage } from 'next'
import DramaCard from '../components/molecules/DramaCard'
import { LoadingButton } from '@mui/lab'
import axios, { AxiosResponse, AxiosError } from 'axios'
import SearchSelectBox from '@/components/atoms/SearchSelectBox'

type DramaProps = {
  id: number
  title: string
  total_ep: number
  year: number
  image: string
}

const dramaData = [
  'ウヨンウ弁護士は天才肌',
  'シスターズ',
  '無人島のディーバ',
  'トッケビ',
  'スタートアップ',
  '二十五、二一',
  '他人は地獄だ',
  '梨泰院クラス',
]

const DramaSearch = () => {
return (
  <>
  <SearchSelectBox />
  <h1>新しいドラマを追加する</h1>
  </>
)
}

export default DramaSearch

