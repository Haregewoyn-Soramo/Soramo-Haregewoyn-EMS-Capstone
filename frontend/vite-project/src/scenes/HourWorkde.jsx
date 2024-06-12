import { useState } from "react";
import { useGetKPIQuery } from "../state/api";
import { Card, Box, Typography, CardContent, useMediaQuery } from '@mui/material';
import Header from "../Components/Header";
import { motion } from 'framer-motion';

const HoursWorked = () => {
  const [date, setDate] = useState([]);
  const { data, isLoading } = useGetKPIQuery();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(max-width:900px)');

  return (
    <Box >
      <Box m={isSmallScreen ? "1rem" : "1.5rem 2.5rem" }>
        <Header title="Total Worked Hours" subtitle="Reflecting Dedication and Productivity" />
      </Box>
      <Box  sx={{ display: "flex", flexDirection: isSmallScreen ? 'column' : 'row', gap: "20px", alignItems: isSmallScreen ? 'center' : 'flex-start', margin: isSmallScreen ? 'auto' : '0' }}>
        <Box sx={{ width: isSmallScreen ? '90%' : isMediumScreen ? '45%' : '30%', marginLeft: isSmallScreen ? '0' : '50px', }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {data?.map((kpi) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={kpi._id}
                style={{ width: "100%" }}
              >
                <Card
                  className="hoursCard"
                  sx={{
                    height: "100%",
                    backgroundImage: `url('https://images.pexels.com/photos/707582/pexels-photo-707582.jpeg?auto=compress&cs=tinysrgb&w=600')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: "gray",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" color="black" sx={{ marginBottom: "1.2rem" }}>
                      Work Hours
                    </Typography>
                    <Typography variant="body1">
                      Total_worked_hours/day: {kpi.hours_worked} Hours
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: "11px" }}>
                      EmpID: {kpi.user_id}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Box>
        <Box sx={{ width: isSmallScreen ? '90%' : isMediumScreen ? '70%' : '63%', flexGrow: 1 }}>
          <Card sx={{ height: '100vh', backgroundImage: `url('https://images.pexels.com/photos/355915/pexels-photo-355915.jpeg?auto=compress&cs=tinysrgb&w=600')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <CardContent />
          </Card>
        </Box>
      </Box>

      <Box sx={{ width: isSmallScreen ? '90%' : '80%', height: "auto", marginTop: "50px", marginBottom: "50px", margin: "auto", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant={isSmallScreen ? "body1" : "h5"} color="gray" textAlign="center">
          Total worked hours reflect your dedication and productivity. By tracking these hours, you can optimize your time, maintain a balanced workload, and achieve better results. Accurate time management is essential for success and well-being.
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

export default HoursWorked;
