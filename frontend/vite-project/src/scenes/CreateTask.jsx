import { useCreatetaskMutation } from "../state/api";
import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Typography, Select, InputLabel, FormControl } from '@mui/material';
import { useTheme } from '@mui/material/styles';


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
    <Box
      sx={{
        maxWidth: 600,
        margin: '100px auto',
        padding: theme.spacing(3),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
        backgroundColor: theme.palette.background.paper
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
  );
};


export default CreateTask