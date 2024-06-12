import { useCreatetaskMutation } from "../state/api";
import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Typography, Select, InputLabel, FormControl } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';



const CreateTask = ()=>{
  const [createTask, isloading] = useCreatetaskMutation()
  const theme = useTheme()
  const [success, setSuccess]= useState('')
  const [error, setError] = useState('');
  const [task, setTask] = useState({
    user_id: '',
    title:'',
    description:'',
    status:[
      'pending', 'in_progress', 'completed', 'overdue'
    ],
    priority: ['low', 'medium', 'high'],
    deadline: '',
  })

  const handleChange = (e)=>{
    setTask({ 
      ...task,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const result = await createTask(task).unwrap()
      console.log('submit data:', task)
      console.log('API response:', result)
      setSuccess('task Created Successfully.')
      setTask({
        user_id: '',
        title:'',
        description:'',
        status:[
          'pending', 'in_progress', 'completed', 'overdue'
        ],
        priority: ['low', 'medium', 'high'],
        deadline: '',
      })

    } catch (error) {
      console.error('Error submitting form:', error);  
    }
  }
    
  return (
 
    <Box backgroundColor="rgba(29, 33, 38, 0.4)" padding='20px'>
        
        <Box
    sx={{
      maxWidth: 600,
      margin: '100px auto',
      padding: theme.spacing(3),
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[3],
      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: theme.shadows[10],
       
      }
    }}
    >
      
      <Typography variant="h4" align="center" gutterBottom>
        Create Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="User ID"
          name="user_id"
          value={task.user_id}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Title"
          name="title"
          value={task.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={task.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={task.status}
            onChange={handleChange}
            required
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in_progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="overdue">Overdue</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Priority</InputLabel>
          <Select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            required
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Deadline"
          name="deadline"
          type="date"
          value={task.deadline}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Create Task
          </Button>
        </Box>
      </form>
      {success && (
        <Typography color="success.main" align="center" mt={2}>
          {success}
        </Typography>
      )}
      {error && (
        <Typography color="error.main" align="center" mt={2}>
          {error}
        </Typography>
      )}
    </Box>

    <Box sx={{  width: "50%", height: "150px", marginTop: "50px", marginBottom: "50px", margin: "auto", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography variant="h5" color="gray" textAlign="center">
    Efficient time management lays the groundwork for goal attainment. Stay organized, stay productive, and watch your tasks transform into triumphs.
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


export default CreateTask