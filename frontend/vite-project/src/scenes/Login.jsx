import { useState } from "react";
import { UseLogin } from "../hooks/UseLogin";
import { Button, Box, Typography, ListItemButton, ListItemIcon, ListItemText, List, ListItem } from '@mui/material';
import { motion } from 'framer-motion';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = UseLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleClick = () => {
    navigate('/dashboard');
  };

  return (
    <Box>
      <Box component="nav" aria-label="My site" sx={{ flexGrow: 1 }}>
        <List component="ul" role="menubar" sx={{ display: 'flex' }}>
          <ListItem component="li" role="none">
            <ListItemButton
              role="menuitem"
              component="a"
              href="#horizontal-list"
              aria-label="Home"
              onClick={handleClick}
              marginRight="auto"
            >
              <ListItemIcon >
                <HomeIcon sx={{color:"white"}}/>
              </ListItemIcon>
              <ListItemText sx={{}}>Dashboard</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem component="li" role="none">
          </ListItem>
          <ListItem component="li" role="none">
          </ListItem>
          <ListItem  component="li" role="none">
            <ListItemButton
              role="menuitem"
              component="a"
              href="#horizontal-list"
              aria-label="Profile"
              sx={{ width: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',  }}
            >
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      <div>
        <form onSubmit={handleSubmit} className="loginForm">
          <h2 style={{ textAlign: 'center', padding: '20px', color: 'black' }}>Log In</h2>
          <label htmlFor="email">Email:</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
          <label htmlFor="password">Password:</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} style={{ display: 'block' }} />
          <Button variant="contained" type="submit" disabled={isLoading}>
            Login
          </Button>
          {error && <div className="errorState">{error}</div>}
        </form>

        <Box sx={{ width: "80%", height: "300px", marginTop: "50px", marginBottom: "50px", margin: "auto", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h5" color="gray" textAlign="center">
            Welcome back! Unlock your potential by signing in and staying connected. Effective time management begins here. Stay focused, stay disciplined, and stay productive. Embrace each moment with purpose and clarity. Log in to transform your aspirations into accomplishments.
          </Typography>
        </Box>

        <motion.footer
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ background: "#1aac83", padding: "0.5rem", textAlign: "center", position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 1000 }}
        >
          <Typography variant="body1" color="white">
            © 2024 Your Company. All rights reserved. | <a href="#" style={{ color: "#ffffff" }}>Privacy Policy</a> | <a href="#" style={{ color: "#ffffff" }}>Terms of Service</a>
          </Typography>
        </motion.footer>
      </div>
    </Box>
  );
};

export default Login;
