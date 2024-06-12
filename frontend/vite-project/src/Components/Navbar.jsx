import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined, ArrowDropDownOutlined } from '@mui/icons-material';
import FlexBetween from '../Components/FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from '../state';
import ProfileImage from '../assets/prof.png';
import { useTheme } from '@emotion/react';
import { AppBar, Button, IconButton, InputBase, MenuItem, Toolbar, Box, Typography, Menu } from '@mui/material';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UseLogout } from '../hooks/UseLogout';
import { UseAuthContext } from '../hooks/UseAuthContext';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout } = UseLogout();
  const { user } = UseAuthContext();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/login');
  };

  return (
    <AppBar sx={{ position: 'static', background: 'none', boxShadow: 'none',  }}>
      <Toolbar sx={{ justifyContent: 'space-between', }}>
        <FlexBetween>
          <IconButton sx={{color:'white'}} onClick={() => setIsSidebarOpen(!isSidebarOpen)} >
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="1.5rem">
          {user ? (
            <div>
              <span>{user.email}</span>
              <Button sx={{ color: theme.palette.secondary[200],}} onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          ) : (
            <Button sx={{ color: theme.palette.secondary[200] }}>
              <Link to="/signin" style={{ textDecoration: 'none', color: theme.palette.secondary[200] }}>
                Sign In
              </Link>
            </Button>
          )}
          <IconButton sx={{color:'white' }} onClick={() => dispatch(setMode())}>
            {theme.palette.mode === 'dark' ? (
              <DarkModeOutlined sx={{ fontSize: '25px' }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: '25px' }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: '25px' }} />
          </IconButton>
          <FlexBetween>
            <Button
              onClick={handleMenuClick}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                textTransform: 'none',
                gap: '1rem',
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={ProfileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: 'cover' }}
              />
              <Box textAlign="left">
                <Typography fontWeight="bold" fontSize="0.85rem" sx={{ color: theme.palette.secondary[200] }}>
                  {user?.name || 'User'}
                </Typography>
              </Box>
              <ArrowDropDownOutlined sx={{ color: theme.palette.secondary[300], fontSize: '25px' }} />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
