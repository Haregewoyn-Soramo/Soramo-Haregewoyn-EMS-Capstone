import { useCreateKPIMutation } from '../state/api';
import { useTheme } from '@emotion/react';
import { Box, Button, TextField, CircularProgress, Snackbar, Typography } from '@mui/material';
import { useState } from 'react';
import Header from '../Components/Header';
import { motion } from 'framer-motion';

const CreateKPI = () => {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    user_id: '',
    date: '',
    tasks: [],
    hours_worked: '',
    quality_of_work: {
      accuracy_completeness: '',
      timeliness: '',
      adherence_guidelines: ''
    }
  });

  const [createKPI, { isLoading }] = useCreateKPIMutation();
  const [success, setSuccess] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("quality_of_work.")) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        quality_of_work: {
          ...prev.quality_of_work,
          [field]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createKPI(formData).unwrap();
      console.log('Submitted Data:', formData);
      console.log('API Response:', result);
      setOpenSnackbar(true);
      setSuccess('KPI Created Successfully.');
      setFormData({
        user_id: '',
        date: '',
        tasks: [],
        hours_worked: '',
        quality_of_work: {
          accuracy_completeness: '',
          timeliness: '',
          adherence_guidelines: ''
        }
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        color: 'white' 
      }}
    >
      <Header title="KPI" subtitle="Tracking Performance Excellence" />
      <TextField
        label="User ID"
        name="user_id"
        value={formData.user_id}
        onChange={handleChange}
        required
        variant="outlined"
        InputLabelProps={{ sx: { color: 'white' } }}
        sx={{ input: { color: 'white' } }}
      />
      <TextField
        label="Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
        variant="outlined"
        InputLabelProps={{ shrink: true, sx: { color: 'white' } }}
        sx={{ input: { color: 'white' } }}
      />
      <TextField
        label="Tasks"
        name="tasks"
        value={formData.tasks}
        onChange={handleChange}
        variant="outlined"
        InputLabelProps={{ sx: { color: 'white' } }}
        sx={{ input: { color: 'white' } }}
      />
      <TextField
        label="Hours Worked"
        name="hours_worked"
        value={formData.hours_worked}
        onChange={handleChange}
        required
        variant="outlined"
        type="number"
        InputLabelProps={{ sx: { color: 'white' } }}
        sx={{ input: { color: 'white' } }}
      />
      <TextField
        label="Accuracy Completeness"
        name="quality_of_work.accuracy_completeness"
        value={formData.quality_of_work.accuracy_completeness}
        onChange={handleChange}
        required
        variant="outlined"
        type="number"
        InputLabelProps={{ sx: { color: 'white' } }}
        sx={{ input: { color: 'white' } }}
      />
      <TextField
        label="Timeliness"
        name="quality_of_work.timeliness"
        value={formData.quality_of_work.timeliness}
        onChange={handleChange}
        required
        variant="outlined"
        type="number"
        InputLabelProps={{ sx: { color: 'white' } }}
        sx={{ input: { color: 'white' } }}
      />
      <TextField
        label="Adherence to Guidelines"
        name="quality_of_work.adherence_guidelines"
        value={formData.quality_of_work.adherence_guidelines}
        onChange={handleChange}
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
        disabled={isLoading}
        sx={{ marginTop: '1rem' }}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Create KPI'}
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={success}
      />

      <Box sx={{ width: "80%", height: "300px", marginTop: "50px", marginBottom: "50px", margin: "auto", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h5" color="gray" textAlign="center">
          Unlock your potential by mastering time management. Organizing your time effectively is the cornerstone of success, paving the way towards achieving your goals. Stay focused, stay disciplined, and stay productive. Embrace each moment with purpose and clarity, and watch as your aspirations transform into accomplishments.
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
    </Box>
  );
};

export default CreateKPI;
