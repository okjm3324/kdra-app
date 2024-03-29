import ArticleIcon from '@mui/icons-material/Article'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Logout from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useUserState } from '@/hooks/useGlobalState'

const Header = () => {
  const [user] = useUserState()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#efeeeb',
        color: 'black',
        boxShadow: 'none',
        py: '12px',
      }}
    >
      <Container maxWidth="lg" sx={{ px: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Link href="/">
              <Image src="/logo.png" width={60} height={60} alt="logo" />
            </Link>
          </Box>
          {user.isFetched && (
            <>
              {!user.isSignedIn && (
                <Box>
                  <Link href="/sign_in">
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
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/sign_up">
                    <Button
                      color="primary"
                      variant="outlined"
                      sx={{
                        textTransform: 'none',
                        fontSize: 16,
                        borderRadius: 2,
                        boxShadow: 'none',
                        border: '1.5px solid #3EA8FF',
                        ml: 2,
                      }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </Box>
              )}
              {user.isSignedIn && (
                <Box sx={{ display: 'flex' }}>
                  <IconButton onClick={handleClick} sx={{ p: 0 }}>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </IconButton>
                  <Box sx={{ ml: 2 }}>
                    <Link href="/spots/create">
                      <Button
                        color="primary"
                        variant="contained"
                        sx={{
                          color: 'white',
                          textTransform: 'none',
                          fontSize: 16,
                          borderRadius: 2,
                          width: 100,
                          boxShadow: 'none',
                        }}
                      >
                        Add new
                      </Button>
                    </Link>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                  >
                    <Box sx={{ pl: 2, py: 1 }}>
                      <Typography sx={{ fontWeight: 'bold' }}>
                        {user.name}
                      </Typography>
                    </Box>
                    <Divider />
                    <Link href={'/preparing_screen'}>
                      <MenuItem>
                        <ListItemIcon>
                          <PersonIcon fontSize="small" />
                        </ListItemIcon>
                        プロフィール
                      </MenuItem>
                    </Link>
                    <Link href={'/preparing_screen'}>
                      <MenuItem>
                        <ListItemIcon>
                          <ArticleIcon fontSize="small" />
                        </ListItemIcon>
                        記事の管理
                      </MenuItem>
                    </Link>
                    <Link href={'/preparing_screen'}>
                      <MenuItem>
                        <ListItemIcon>
                          <FavoriteIcon fontSize="small" />
                        </ListItemIcon>
                        マイスポット
                      </MenuItem>
                    </Link>
                    <Link href="/sign_out">
                      <MenuItem>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        サインアウト
                      </MenuItem>
                    </Link>
                  </Menu>
                </Box>
              )}
            </>
          )}
        </Box>
      </Container>
    </AppBar>
  )
}

export default Header
