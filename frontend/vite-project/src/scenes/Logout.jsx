import { useGetAttendaceQuery } from "../state/api";
import { Box, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import Header from "../Components/Header";

const Logout = () => {
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
<Box backgroundColor="rgba(29, 33, 38, 0.4)" padding='20px'>

<Box m="1.5rem 2.5rem">
      <Header title="Attendance" subtitle="Ensuring Consistency and Commitment" />
      <Box>
      <Grid container spacing={1} sx={{mt:'6rem'}}>
        {data && data.map((record) => (
          <Grid item xs={5} key={record._id} sx={{ m: "auto" }}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.2 }}>
              <Paper
                elevation={3}
                style={{
                  padding: '1rem',
                  backgroundImage: `url("https://media.istockphoto.com/id/1202559909/photo/beams-of-spotlight-on-a-red-background.jpg?b=1&s=612x612&w=0&k=20&c=KVZ1uv-EIqk7FaK__8b-GpgOW-omszswazT75C6Zx3E=")`,
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
        style={{ background: "#1aac83", padding: "0.5rem", textAlign: "center", position: "fixed",  bottom: 0, left: 0,
          width: "100%",  zIndex: 1000}}
      >
        <Typography variant="body1" color="white">
          © 2024 Your Company. All rights reserved. | <a href="#" style={{ color: "#ffffff" }}>Privacy Policy</a> | <a href="#" style={{ color: "#ffffff" }}>Terms of Service</a>
        </Typography>
      </motion.footer>

    </Box>

     </Box>
    
  );
};

export default Logout;
