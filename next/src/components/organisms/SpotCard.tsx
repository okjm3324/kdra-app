import { Box, Card, CardContent, Typography, CardMedia } from '@mui/material'
import { useEffect, useState } from 'react'

type SpotCardProps = {
  name: string
  address: string
  longitude: number
  latitude: number
  userName: string
  imageKey: string
}

const omit = (text: string) => (len: number) => (ellipsis: string) =>
  text.length >= len ? text.slice(0, len - ellipsis.length) + ellipsis : text

const SpotCard = (props: SpotCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography
          component="h3"
          sx={{
            mb: 2,
            minHeight: 48,
            fontSize: 16,
            fontWeight: 'bold',
            lineHeight: 1.5,
          }}
        >
          {omit(props.name)(45)('...')}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: 12 }}>{props.userName}</Typography>
          <Typography sx={{ fontSize: 12 }}>{props.address}</Typography>

          <Box sx={{ width: 20, height: 20 }}>
            <img src={''} alt="画像"></img>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default SpotCard
