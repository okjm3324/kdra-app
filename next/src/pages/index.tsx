import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { Typography, Card, CardMedia, Box, Button, Link } from '@mui/material'
import type { NextPage } from 'next'
const Top: NextPage = () => {
  return (
    <Box sx={{ backgroundColor: '#EFEEEB', minHeight: '100vh' }}>
      <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
        <Card elevation={0} sx={{ width: '100%' }}>
          <CardMedia
            component="img"
            height="auto"
            image="/top.webp"
            sx={{ width: '100%', height: 'auto' }}
          />
        </Card>
      </Box>
      <Box sx={{ mx: 'auto' }}>
        <Typography
          variant="h6"
          sx={{ textAlign: 'center', fontWeight: 'bold', color: '#ED9FA0' }}
        >
          使い方
        </Typography>
      </Box>

      <Card
        elevation={0}
        sx={{
          backgroundColor: '#ED9FA0',
          width: '100%',
          maxWidth: '300px',
          mx: 'auto',
          mt: 8,
          p: 1,
        }}
      >
        <Typography variant="h6" color="white" sx={{ fontWeight: 'bold' }}>
          ❶ NaverMapをインストール
        </Typography>
        <CardMedia
          component="img"
          height="auto"
          image="/naver.webp"
          sx={{ width: '100%', height: 'auto', borderRadius: 1, my: 2 }}
        />
        <Typography color="white">
          韓国旅行といえばNaverMap!聖地にたどり着くためにダウンロードしてください！
        </Typography>
      </Card>
      <Card
        elevation={0}
        sx={{
          backgroundColor: '#ED9FA0',
          width: '100%',
          maxWidth: '300px',
          mx: 'auto',
          mt: 8,
          p: 1,
        }}
      >
        <Typography variant="h6" color="white" sx={{ fontWeight: 'bold' }}>
          ❷ 好きなドラマを探す
        </Typography>
        <CardMedia
          component="img"
          height="auto"
          image="/marker.gif"
          sx={{ width: '100%', height: 'auto', borderRadius: 1, my: 2 }}
        />
        <Typography color="white">
          セレクトボックスから好きなドラマを選んでください。マップにピンが表示されます。
        </Typography>
      </Card>
      <Card
        elevation={0}
        sx={{
          backgroundColor: '#ED9FA0',
          width: '100%',
          maxWidth: '300px',
          mx: 'auto',
          mt: 8,
          p: 1,
        }}
      >
        <Typography variant="h6" color="white" sx={{ fontWeight: 'bold' }}>
          ❸ ピンをタップ！
        </Typography>
        <CardMedia
          component="img"
          height="auto"
          image="/show.gif"
          sx={{ width: '100%', height: 'auto', borderRadius: 1, my: 2 }}
        />
        <Typography color="white">
          交通機関を選択してNaverMapへGOを押すとルートが検索できます。
        </Typography>
      </Card>
      <Card
        elevation={0}
        sx={{
          backgroundColor: '#ED9FA0',
          width: '100%',
          maxWidth: '300px',
          mx: 'auto',
          mt: 8,
          p: 1,
        }}
      >
        <Typography variant="h6" color="white" sx={{ fontWeight: 'bold' }}>
          ❹ 会員登録してロケ地を投稿
        </Typography>
        <Typography color="white">
          いっしょに韓ドラのロケ地のデータベースを作りましょう！
        </Typography>
      </Card>
      <Box
        sx={{ mx: 'auto', display: 'flex', justifyContent: 'center', my: 2 }}
      >
        <ArrowDownwardIcon sx={{ color: 'primary.main' }} />
      </Box>
      <Box
        sx={{ mx: 'auto', display: 'flex', justifyContent: 'center', my: 2 }}
      >
        <Link href="/top">
          <Button
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
            ロケ地を探す
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default Top
