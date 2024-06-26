import React from 'react';
import { Card, Box, Typography, useMediaQuery } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { motion } from 'framer-motion';
import Header from '../Components/Header';

const Date = () => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.between('sm', 'md'));
  
  return (
    <Box style={{ minHeight: "100vh", position: "relative" }} backgroundColor="rgba(29, 33, 38, 0.4)" padding='20px'>
      <Box m="1.5rem 2.5rem">
        <Header title="Calendar Selection" subtitle="Pick a Date from the Calendar Below" />
      </Box>
      
      <Box sx={{ 
        display: "flex", 
        flexDirection: isSmallScreen ? 'column' : 'row', 
        margin: "auto", 
        gap: isSmallScreen ? 4 : 10, 
        justifyContent: "center", 
        alignItems: 'center', 
        ml:'8rem',
        mr:'4rem',
        mt:"6rem",
        color:'white',
        
      }}>
        <motion.div
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.5 }}
          style={{ 
            width: isSmallScreen ? '80%' : isMediumScreen ? '60%' : '40%', 
            height: "40vh" 
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundImage: `url('https://media.istockphoto.com/id/1472185863/photo/desk-calendar-on-table-with-blurred-bokeh-background-appointment-and-business-meeting-concept.jpg?s=2048x2048&w=is&k=20&c=akJCcTHpslEedIlmlrGEHi4tyU_eLvRkwphiwlIrows=')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 3,
              borderRadius: 2,
            }}
          ></Box>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ 
            flex: 1, 
            width: isSmallScreen ? '80%' : 'auto', 
            
          }}
        >
          <Card
            sx={{
              background: "#808000",
              color: "#white",
              height: "40vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 3,
              borderRadius: "10px",
              fontSize:'bold'
              
            }}
          >
            <LocalizationProvider  dateAdapter={AdapterDayjs}>
              <DateCalendar />
            </LocalizationProvider>
          </Card>
        </motion.div>
      </Box>
      
      <Box sx={{ 
        width: isSmallScreen ? '90%' : '80%', 
        height: "300px", 
        marginTop: "50px", 
        marginBottom: "0px", 
        margin: "auto", 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Typography variant="h5" color="gray" textAlign="center">
          Organizing your time effectively is the first step towards achieving your goals. Stay organized, stay productive.
        </Typography>
      </Box>
      
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ background: "#1aac83", padding: "0.5rem", textAlign: "center", position: "fixed",  bottom: 0, left: 0,
          width: "100%",  zIndex: 1000}}
      >
        <Typography variant="body1" color="white">
          © 2024 Your Company. All rights reserved. | <a href="#" style={{ color: "#ffffff" }}>Privacy Policy</a> | <a href="#" style={{ color: "#ffffff" }}>Terms of Service</a>
        </Typography>
      </motion.footer>
    </Box>
  );
}

export default Date;
