import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "../Components/Header";
import { motion } from "framer-motion";
import { useUpdateKPIMutation, useGetKPIQuery } from "../state/api";

const UpdateKPI = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialSelectedKPI = location.state?.kpi || {
    _id: '',
    user_id: '',
    date: '',
    tasks: [],
    hours_worked: '',
    quality_of_work: {
      accuracy_completeness: '',
      timeliness: '',
      adherence_guidelines: '',
    },
  };

  const { data, error, isLoading: isLoadingData } = useGetKPIQuery();
  const [updateKPI] = useUpdateKPIMutation();
  const [selectedKPI, setSelectedKPI] = useState(initialSelectedKPI);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [success, setSuccess] = useState('');

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(max-width:900px)');

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    const [mainKey, subKey] = name.split('.');
    if (subKey) {
      setSelectedKPI((prev) => ({
        ...prev,
        [mainKey]: {
          ...prev[mainKey],
          [subKey]: value,
        },
      }));
    } else {
      setSelectedKPI((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateKPI({ id: selectedKPI._id, ...selectedKPI }).unwrap();
      setSuccess('KPI Updated Successfully');
      setOpenSnackbar(true);
      navigate('/dashboard'); 
    } catch (error) {
      console.error("Error updating KPI:", error);
      setSuccess('Error updating KPI. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (error) {
      console.error("Error fetching KPI data:", error);
    }
  }, [error]);

  return (
    <Box backgroundColor="rgba(29, 33, 38, 0.4)" padding="20px">
      <Box m={isSmallScreen ? "1rem" : "1.5rem 2.5rem"}>
        <Header title="Total Worked Hours" subtitle="Reflecting Dedication and Productivity" />
      </Box>
      <Box
        component="form"
        onSubmit={handleUpdateSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          color: 'white',
        }}
      >
        <Header title="KPI" subtitle="Tracking Performance Excellence" />
        {error && (
          <Typography variant="h6" color="error">
            Error fetching KPI data: {error.message}
          </Typography>
        )}
        <TextField
          label="User ID"
          name="user_id"
          value={selectedKPI.user_id}
          onChange={handleUpdateChange}
          required
          variant="outlined"
          InputLabelProps={{ sx: { color: 'white' } }}
          sx={{ input: { color: 'white' } }}
        />
        <TextField
          label="Date"
          name="date"
          type="date"
          value={selectedKPI.date}
          onChange={handleUpdateChange}
          required
          variant="outlined"
          InputLabelProps={{ shrink: true, sx: { color: 'white' } }}
          sx={{ input: { color: 'white' } }}
        />
        <TextField
          label="Tasks"
          name="tasks"
          value={selectedKPI.tasks.join(', ')}
          onChange={(e) => setSelectedKPI({ ...selectedKPI, tasks: e.target.value.split(', ') })}
          variant="outlined"
          InputLabelProps={{ sx: { color: 'white' } }}
          sx={{ input: { color: 'white' } }}
        />
        <TextField
          label="Hours Worked"
          name="hours_worked"
          value={selectedKPI.hours_worked}
          onChange={handleUpdateChange}
          required
          variant="outlined"
          type="number"
          InputLabelProps={{ sx: { color: 'white' } }}
          sx={{ input: { color: 'white' } }}
        />
        <TextField
          label="Accuracy Completeness"
          name="quality_of_work.accuracy_completeness"
          value={selectedKPI.quality_of_work.accuracy_completeness}
          onChange={handleUpdateChange}
          required
          variant="outlined"
          type="number"
          InputLabelProps={{ sx: { color: 'white' } }}
          sx={{ input: { color: 'white' } }}
        />
        <TextField
          label="Timeliness"
          name="quality_of_work.timeliness"
          value={selectedKPI.quality_of_work.timeliness}
          onChange={handleUpdateChange}
          required
          variant="outlined"
          type="number"
          InputLabelProps={{ sx: { color: 'white' } }}
          sx={{ input: { color: 'white' } }}
        />
        <TextField
          label="Adherence to Guidelines"
          name="quality_of_work.adherence_guidelines"
          value={selectedKPI.quality_of_work.adherence_guidelines}
          onChange={handleUpdateChange}
          required
          variant="outlined"
          type="number"
          InputLabelProps={{ sx: { color: 'white' } }}
          sx={{ input: { color: 'white' } }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoadingData}
          sx={{ marginTop: '1rem' }}
        >
          {isLoadingData ? <CircularProgress size={24} /> : 'Update KPI'}
        </Button>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={success}
        />
        <Box
          sx={{
            width: "80%",
            height: "300px",
            marginTop: "50px",
            marginBottom: "50px",
            margin: "auto",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h5" color="gray" textAlign="center">
            Unlock your potential by mastering time management. Organizing your time effectively is the cornerstone of success, paving the way towards achieving your goals. Stay focused, stay disciplined, and stay productive. Embrace each moment with purpose and clarity, and watch as your aspirations transform into accomplishments.
          </Typography>
        </Box>
        <motion.footer
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: "#1aac83",
            padding: "0.5rem",
            textAlign: "center",
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            zIndex: 1000,
          }}
        >
          <Typography variant="body1" color="white">
            © 2024 Your Company. All rights reserved. | <a href="#" style={{ color: "#ffffff" }}>Privacy Policy</a> | <a href="#" style={{ color: "#ffffff" }}>Terms of Service</a>
          </Typography>
        </motion.footer>
      </Box>
    </Box>
  );
};

export default UpdateKPI;
