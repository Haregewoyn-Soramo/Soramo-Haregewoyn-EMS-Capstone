import { Box, Typography, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import DashboarCarousel from '../Components/DashboarCarousel';
import DashboarCard from '../Components/DashboarCard';

const Dashboard = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  
  return (
    <Box backgroundColor="rgba(29, 33, 38, 0.4)" padding="20px">
      <Box display="flex" flexDirection={isSmallScreen ? 'column' : 'row'} width="100%" margin="auto" mt="70px" gap="20px">
        <Box width="100%" height={isSmallScreen ? '200px' : '400px'} borderRadius="10px" backgroundSize="cover" backgroundPosition="center" style={{ backgroundImage: `url('https://images.pexels.com/photos/632470/pexels-photo-632470.jpeg?auto=compress&cs=tinysrgb&w=600')`,}} />
        <Box width="100%" padding="20px"  borderRadius="10px"  mt="7rem">
          <Typography textAlign="center" >
            Excellence in job performance defines a true professional. By delivering high-quality work, showing strong work ethic, and maintaining a positive attitude, you set a standard of excellence. Your dedication and collaboration drive both personal and organizational success. Keep striving for greatness; your efforts are invaluable.
          </Typography>
        </Box>
      </Box>
      <Box display="flex" flexDirection={isSmallScreen ? 'column' : 'row'} width="100%" margin="auto" mt="30px" gap="20px">
        <Box width="100%" padding="20px" borderRadius="10px" mt="7rem">
          <Typography>
            A positive work environment is crucial for productivity and job satisfaction. By fostering teamwork, encouraging innovation, and maintaining a clean, organized space, we create a foundation for success. As Helen Keller said, Alone we can do so little; together we can do so much.
          </Typography>
        </Box>
        <Box width="100%" padding="20px"  borderRadius="10px">
          <DashboarCarousel />
        </Box>
      </Box>
      <Box display="flex" flexDirection={isSmallScreen ? 'column' : 'row'} width="100%" margin="auto" mt="30px" mb="100px" gap="20px">
        <Box width="100%" padding="20px"  borderRadius="10px">
          <DashboarCard />
        </Box>
        <Box width="100%" padding="20px"  borderRadius="10px" mt="7rem">
          <Typography>
            Leadership is more than a title, It's a mindset that inspires action and drives change. At its core, leadership is about empowering others to reach their full potential and fostering an environment where innovation thrives. Great leaders lead by example, guiding their teams with integrity, vision, and empathy.
          </Typography>
        </Box>
      </Box>
      <Box
        width={isSmallScreen ? '90%' : '80%'}
        margin="auto"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        mb="50px"
      >
        <Typography variant={isSmallScreen ? "body1" : "h5"} color="gray" mb="50px">
          Welcome to the main dashboard. Here, you can effortlessly monitor your performance metrics, stay updated with key insights, and manage your tasks efficiently. Harness the power of data to drive your productivity and achieve your goals with clarity and precision.
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

export default Dashboard;
