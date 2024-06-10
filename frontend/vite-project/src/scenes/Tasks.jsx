import React, { useState } from "react";
import { useGetTaskQuery } from "../state/api";
import Header from "../Components/Header";
import { Box, Card, CardActions, CardContent, Button, Typography, Collapse, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from "react-router-dom";
import { useDeleteTaskMutation } from "../state/api";
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';



const StyledCard = styled(Card)(({ theme }) => ({
  backgroundImage: "none",
  borderRadius: "0.55rem",
  position: "relative",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#ffffff',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[10],
  },
}));

const Task = ({
  title,
  description,
  status,
  priority,
  deadline,
  created_at,
  user_id,
  updated_at,
  _id
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [deleteTask, { isLoading: deleteLoading }] = useDeleteTaskMutation();
  const [success, setSuccess] = useState('');
  const [deletedId, setDeletedId] = useState('');

  const handleDelete = async () => {
    try {
      await deleteTask({ id: _id }).unwrap();
      console.log('Deleted task with ID:', _id);
      setSuccess("Task deleted successfully");
      setDeletedId('');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: "1.5rem", color: "black"}}>
          Title: {title}
        </Typography>
        <Typography sx={{ fontSize: 12, mb: "1.2rem", fontWeight: "bold", color: theme.palette.secondary.main }} gutterBottom>
          Priority: {priority}
        </Typography>
        <Typography sx={{ mb: "1.2rem", color: theme.palette.text.secondary }}>
          Deadline: {new Date(deadline).toLocaleString()}
        </Typography>
        <Typography sx={{ mb: "1.2rem", fontWeight: "bold", color: theme.palette.text.secondary }}>
          Status: {status}
        </Typography>
        <IconButton
          color="secondary"
          sx={{position:"absolute", top:"10px", right:"10px", color:"gray"}}
          onClick={handleDelete}
          disabled={deleteLoading}
        >
          <DeleteIcon />
        </IconButton>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" sx={{ fontSize: "7px", backgroundColor: "#666666", color: "#fff", }} onClick={() => setIsExpanded(!isExpanded)}>
          See More
        </Button>
      </CardActions>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit sx={{ color: theme.palette.text.secondary }}>
        <CardContent>
          <Typography sx={{ mb: "1.2rem" }}>
            Description: {description}
          </Typography>
          <Typography> EmpID: {user_id}</Typography>
          <Typography> created_at: {new Date(created_at).toLocaleString()}</Typography>
          <Typography> updated_at: {new Date(updated_at).toLocaleString()}</Typography>
        </CardContent>
      </Collapse>
    </StyledCard>
  );
};

const Tasks = () => {
  const { data, isLoading } = useGetTaskQuery();
  console.log('data:', data);
  const isNoneMobile = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();

  const handleClick = (event, path) => {
    navigate(path);
  };

  return (
    <Box>
         
                
         <Box m="1.5rem 2.5rem">
      <Header title="Tasks" subtitle="Track and Manage Your Assigned Tasks" />
      {data || !isLoading ? (
        <Box mt="20px" display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{ "& > div": { gridColumn: isNoneMobile ? undefined : "span 4" } }}>
          {data.map(({ _id, title, description, status, priority, deadline, created_at, user_id, updated_at }) => (
            <Task
              key={_id}
              _id={_id}
              title={title}
              description={description}
              status={status}
              priority={priority}
              deadline={deadline}
              created_at={created_at}
              user_id={user_id}
              updated_at={updated_at}
            />
          ))}
        </Box>
      ) : (
        <> Loading...</>
      )}
      <Button sx={{ marginTop: "10px", backgroundColor: "#666666", padding: "5px 8px", marginBottom: "50px", marginTop: "20px", fontWeight: "bolder", color: "#fff" }} onClick={(event) => handleClick(event, '/createtask')}>
        Create Task
      </Button>
    </Box>

<Box sx={{  width: "50%", height: "300px", marginTop: "50px", marginBottom: "50px", margin: "auto", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
<Typography variant="h5" color="gray" textAlign="center">
Efficient time management lays the groundwork for goal attainment. Stay organized, stay productive, and watch your tasks transform into triumphs.
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

export default Tasks;
