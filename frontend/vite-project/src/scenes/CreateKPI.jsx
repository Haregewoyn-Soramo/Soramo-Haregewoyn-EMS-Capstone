import { useCreateKPIMutation } from '../state/api';
import { useTheme } from '@emotion/react';
import { Box, Button, TextField, CircularProgress, Snackbar } from '@mui/material';
import { useState } from 'react';

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
  const [success, setSuccess] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)

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
      setOpenSnackbar(true)
      setSuccess('KPI Created Successfully.')
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
      })
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
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}
    >
      <TextField
        label="User ID"
        name="user_id"
        value={formData.user_id}
        onChange={handleChange}
        required
        variant="outlined"
      />
      <TextField
        label="Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Tasks"
        name="tasks"
        value={formData.tasks}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        label="Hours Worked"
        name="hours_worked"
        value={formData.hours_worked}
        onChange={handleChange}
        required
        variant="outlined"
        type="number"
      />
      <TextField
        label="Accuracy Completeness"
        name="quality_of_work.accuracy_completeness"
        value={formData.quality_of_work.accuracy_completeness}
        onChange={handleChange}
        required
        variant="outlined"
        type="number"
      />
      <TextField
        label="Timeliness"
        name="quality_of_work.timeliness"
        value={formData.quality_of_work.timeliness}
        onChange={handleChange}
        required
        variant="outlined"
        type="number"
      />
      <TextField
        label="Adherence to Guidelines"
        name="quality_of_work.adherence_guidelines"
        value={formData.quality_of_work.adherence_guidelines}
        onChange={handleChange}
        required
        variant="outlined"
        type="number"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
        sx={{ marginTop: '1rem' }}
      >
        {isLoading ? <CircularProgress size={24} /> : 'Create KPI'}
        <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={success}
      />
      </Button>
    </Box>
  );
};

export default CreateKPI;