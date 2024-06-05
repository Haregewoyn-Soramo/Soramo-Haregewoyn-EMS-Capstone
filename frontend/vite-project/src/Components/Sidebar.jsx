import{ Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme
} from '@mui/material'
import { DashboardOutlined, BarChartOutlined, CheckCircleOutline, AccessTimeOutlined, GradeOutlined, EventAvailableOutlined, LoginOutlined, LogoutOutlined, FeedbackOutlined, PersonOutline, TextFieldsOutlined, StarOutline, NotificationsNoneOutlined, MessageOutlined, AssessmentOutlined, DescriptionOutlined, ScheduleOutlined, TodayOutlined, ChevronRightOutlined } from '@mui/icons-material';
import FlexBetween from '../Components/FlexBetween';
import ProfileImage from '../assets/prof.png'
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';




const navItems = [
  {
    text: "Dashboard",
    icon: <DashboardOutlined />
  },
  {
    text: "KPI Pereformance",
    icon: null
  },
  {
    text: "Date",
    icon: <TodayOutlined />
  },
  {
    text: "Task Completed",
    icon: <CheckCircleOutline />
  },
  {
    text: "Hours Worked",
    icon: <AccessTimeOutlined />
  },
  {
    text: "Quality of Work",
    icon: <GradeOutlined />
  },
  {
    text: "Attendance",
    icon: null
  },
  {
    text: "Login Time",
    icon: <LoginOutlined />
  },
  {
    text: "Logout Time",
    icon: <LogoutOutlined />
  },
  {
    text: "Feedback",
    icon: null
  },
  {
    text: "Manager Name",
    icon: <PersonOutline />
  },
  {
    text: "Feedback Text",
    icon: <TextFieldsOutlined />
  },
  {
    text: "Rating",
    icon: <StarOutline />
  },
  {
    text: "Notification",
    icon: null
  },
  {
    text: "Message",
    icon: <MessageOutlined />
  },
  {
    text: "Report",
    icon: null
  },
  {
    text: "Custom Report",
    icon: <DescriptionOutlined />
  },
  {
    text: "Scheduled Report",
    icon: <ScheduleOutlined />
  }
];



const Sidebar = ({isNonMobile, drawerWidth, isSidebarOpen, setIsSidebarOpen}) =>{
       const  {pathname} = useLocation();
       const  [active, setActive] = useState('');
       const  navigate = useNavigate();
       const  theme = useTheme();

       useEffect(() =>{
        setActive(pathname.substring(1));
       }, [pathname])

  return <Box component= "nav">
    {isSidebarOpen && (<Drawer open = {isSidebarOpen} onClose={()=>setIsSidebarOpen(false)} variant='persistent' anchor='left'
     sx = {{width: drawerWidth, "& .MuiDrawer-paper":{
      color:theme.palette.secondary[150],
      backgroundColor: theme.palette.background.alt,
      boxSizing:'border-box',
      borderWidth: isNonMobile ? 0 :" 2px",
      width: drawerWidth
     } 
    }}
    >
      <Box width= "100%">
          <Box m= "1.5rem 2rem 2rem 3rem">
            <FlexBetween color={theme.palette.secondary.main}>
              <Box display= "flex" alignItems= "center" gap= "0.5rem">
                 <Typography variant='h4'fontWeight= 'bold'>
                     EM System
                 </Typography>
              </Box>
              {!isNonMobile && (<IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <ChevronLeft/>
              </IconButton>
            )}
            </FlexBetween>
          </Box>
          <List>
            {navItems.map(({text, icon}) =>{
                 if(!icon){
                  return(
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                               {text}
                    </Typography>
                  )
                 }
                 const lcText = text.toLowerCase();
                 return (
                  <ListItem  key={text} disablePadding>
                      <ListItemButton onClick={() => { navigate(`/${lcText}`); setActive(lcText)}}  
                      sx = {{
                         backgroundColor:active === lcText ? theme.palette.secondary [300]
                         : "transparent",
                         color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[100],
                      }} >
                       <ListItemIcon sx= {{ml: "2rem", color: active === lcText ? 
                                     theme.palette.primary[600] : theme.palette.secondary[200]}}>
                              {icon}
                        </ListItemIcon>
                        <ListItemText primary = {text}/>
                        {active === lcText && (
                          <ChevronRightOutlined sx = {{ml: "auto"}}/>
                        )}
                      </ListItemButton>
                    </ListItem>
                );
              })}
            </List>
      </Box>
    </Drawer>
)}
  </Box>
}

export default Sidebar