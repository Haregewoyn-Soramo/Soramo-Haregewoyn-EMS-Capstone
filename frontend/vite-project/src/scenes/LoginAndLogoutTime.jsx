import { useGetAttendaceQuery } from "../state/api";
import { Box, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import Header from "../Components/Header";

const LoginAndLogout = () => {
  const { data, isLoading } = useGetAttendaceQuery();
  console.log(data);


 

  const handleRotation = (event) => {
    event.currentTarget.classList.toggle('rotate');
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Attendance" subtitle="Ensuring Consistency and Commitment" />
      <Box>
      <Grid container spacing={1} sx={{}}>
        {data && data.map((record) => (
          <Grid item xs={5} key={record._id} sx={{ m: "auto" }}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.2 }}>
              <Paper
                elevation={3}
                style={{
                  padding: '1rem',
                  backgroundImage: `url("https://images.pexels.com/photos/1034425/pexels-photo-1034425.jpeg?auto=compress&cs=tinysrgb&w=600")`,
                  borderRadius: "10px",
                  position: 'relative',
                  width: "80%",
                  margin: "auto",
                  marginBottom: "1rem",
                }}
                className="rotate"
                onClick={handleRotation}
              >
                <Typography variant="body1" sx={{color:"darkgrey"}}>Date: {new Date(record.date).toLocaleDateString()}</Typography>
                <Typography variant="body1" sx={{color:"darkgrey"}}>Login Time: {new Date(record.login_time).toLocaleTimeString()}</Typography>
                <Typography variant="body1" sx={{color:"darkgrey"}}>Logout Time: {new Date(record.logout_time).toLocaleTimeString()}</Typography>
                <Typography variant="body1" mb="1rem" sx={{color:"darkgrey"}}>
                  Hours Worked: {(new Date(record.logout_time) - new Date(record.login_time)) / 3600000}
                </Typography>
                <Typography sx={{ mb: "10px", color: "darkgray", fontSize: "11px" }}>EmpID: {record.user_id}</Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      </Box>
      <Box sx={{  width: "80%", height: "300px", marginTop: "50px", marginBottom: "50px", margin: "auto", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h5" color="gray" textAlign="center">
              Attendance is essential for success, showcasing commitment and reliability. Regular attendance enhances learning, productivity, and collaboration. It builds trust, fosters community, and ensures goals are met. 
        </Typography>
      </Box>
      
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ background: "#1aac83", padding: "1rem", textAlign: "center", marginTop: "auto" }}
      >
        <Typography variant="body1" color="white">
          © 2024 Your Company. All rights reserved. | <a href="#" style={{ color: "#ffffff" }}>Privacy Policy</a> | <a href="#" style={{ color: "#ffffff" }}>Terms of Service</a>
        </Typography>
      </motion.footer>

    </Box>
    
  );
};

export default LoginAndLogout;
