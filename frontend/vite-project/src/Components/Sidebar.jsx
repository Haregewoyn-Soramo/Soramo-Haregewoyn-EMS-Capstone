import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme
} from '@mui/material';
import {
  DashboardOutlined,
  BarChartOutlined,
  CheckCircleOutline,
  AccessTimeOutlined,
  GradeOutlined,
  EventAvailableOutlined,
  LoginOutlined,
  LogoutOutlined,
  PersonOutline,
  TextFieldsOutlined,
  StarOutline,
  NotificationsNoneOutlined,
  MessageOutlined,
  AssessmentOutlined,
  DescriptionOutlined,
  ScheduleOutlined,
  TodayOutlined,
  ChevronRightOutlined,
  SettingsOutlined,
  PersonOutlined
} from '@mui/icons-material';
import FlexBetween from '../Components/FlexBetween';
import ProfileImage from '../assets/prof.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const navItems = [
  { text: "Dashboard", icon: <DashboardOutlined /> },
  { text: "KPI Pereformance", icon: null },
  { text: "Date", icon: <TodayOutlined /> },
  { text: "Tasks", icon: <CheckCircleOutline /> },
  { text: "Hours", icon: <AccessTimeOutlined /> },
  { text: "Quality", icon: <GradeOutlined /> },
  { text: "KPI", icon: <BarChartOutlined /> },
  { text: "Attendance", icon: null },
  { text: "Login", icon: <LoginOutlined /> },
  { text: "Logout", icon: <LogoutOutlined /> },
  { text: "Feedback", icon: null },
  { text: "Manager Name", icon: <PersonOutline /> },
  { text: "Feedback Text", icon: <TextFieldsOutlined /> },
  { text: "Rating", icon: <StarOutline /> },
  { text: "Notification", icon: null },
  { text: "Message", icon: <MessageOutlined /> },
  { text: "Report", icon: null },
  { text: "Custom", icon: <DescriptionOutlined /> },
  { text: "Scheduled", icon: <ScheduleOutlined /> },
  { text: "Department" },
  { text: "Employees", icon: <PersonOutlined /> },
];

const Sidebar = ({ isNonMobile, drawerWidth, isSidebarOpen, setIsSidebarOpen, user }) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {!isNonMobile && (
        <IconButton
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          sx={{ position: 'fixed', zIndex: 999, top: '10px', left: '10px' }}
        >
          <ChevronRightOutlined />
        </IconButton>
      )}
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant={isNonMobile ? "persistent" : "temporary"}
          anchor="left"
          sx={{
            width: isNonMobile ? drawerWidth : '100%',
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[150],
              backgroundColor: theme.palette.background.alt,
              boxSizing: 'border-box',
              borderWidth: isNonMobile ? 0 : "2px",
              width: isNonMobile ? drawerWidth : '100%'
            }
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold" sx={{ color: "#1aac83" }}>
                    EM System
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronRightOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  )
                }
                const lcText = text.toLowerCase().replace(' ', '-');
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        if (text === "KPI Pereformance") {
                          navigate("/kpi-performance");
                        } else {
                          navigate(`/${lcText}`);
                        }
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor: active === lcText ? theme.palette.secondary[300] : "transparent",
                        color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon sx={{
                        ml: "2rem",
                        color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[200]
                      }}>
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 2rem 3rem">
              <Box component="img" alt="profile" src={ProfileImage} height="40px" width="40px" borderRadius="50%" sx={{ objectFit: "cover" }} />
              <Box textAlign="left">
                <Typography fontWeight="bold" fontSize="0.8rem" sx={{ color: theme.palette.secondary[200] }}>
                  {user.name}
                </Typography>
                <SettingsOutlined sx={{ color: theme.palette.secondary[300], fontSize: "25px" }} />
              </Box>
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  )
}

export default Sidebar;
