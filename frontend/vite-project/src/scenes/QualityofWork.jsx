import { useGetKPIQuery } from "../state/api";
import Header from "../Components/Header";
import { Card, Box, Typography, useMediaQuery, CircularProgress } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { motion } from 'framer-motion';
import { useState } from "react";

const QualityOfWork = () => {
  const { data, isLoading } = useGetKPIQuery();
  const [isCardClicked, setIsCardClicked] = useState(false);
  const isNoneMobile = useMediaQuery("(min-width: 1000px)");
  

  const handleClick = () => {
    setIsCardClicked((prev) => !prev);
  };

  return (
    <Box backgroundColor="rgba(29, 33, 38, 0.4)" padding='20px'>
      <Box m="1.5rem 2.5rem">
        <Header title="Quality of Work" subtitle="Excellence in Performance Measurement" />
      </Box>
      {isLoading ? (
        <Box display="flex" justifyContent="center" mt="2rem">
          <CircularProgress />
        </Box>
      ) : (
        <Box mt="20px" display="grid"
          ml="50px"
          mr="50px"
          gridTemplateColumns="repeat(2, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="2.66%"
          mt="6rem"
          sx={{ "& > div": { gridColumn: isNoneMobile ? undefined : "span 2" } }}>
          {data ? data.map((quality) => (
            <motion.div
              key={`${quality.user_id}-${quality.created_at}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                onClick={handleClick}
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  transform: isCardClicked ? 'translateX(20px)' : 'translateX(0)',
                  padding: '1rem',
                  margin: '0.5rem',
                  borderRadius:"30px",
                  backgroundColor:"#010B13",
                  color:"darkgray"
                }}
              >
                <Box display="flex" flexDirection="column" alignItems="center">
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: `${quality.user_id}-${quality.created_at}-accuracy_completeness`, value: quality.quality_of_work.accuracy_completeness, label: 'Accuracy Completeness' },
                          { id: `${quality.user_id}-${quality.created_at}-timeliness`, value: quality.quality_of_work.timeliness, label: 'Timeliness' },
                          { id: `${quality.user_id}-${quality.created_at}-adherence_guidelines`, value: quality.quality_of_work.adherence_guidelines, label: 'Adherence Guidelines' },
                        ],
                      },
                    ]}
                    width={400}
                    height={200}
                  />
                  <Typography fontSize="11px" mt={2}>EmpId: {quality.user_id}</Typography>
                </Box>
              </Card>
            </motion.div>
          )) : (
            <Typography>No data available</Typography>
          )}
        </Box>
      )}
        <Box sx={{  width: "50%", height: "150px", marginTop: "50px", marginBottom: "50px", margin: "auto", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h5" color="gray" textAlign="center">
              Stay organized, stay productive. Efficient time management leads to success. Prioritize tasks, manage your schedule wisely, and watch your achievements grow!
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
};

export default QualityOfWork;
