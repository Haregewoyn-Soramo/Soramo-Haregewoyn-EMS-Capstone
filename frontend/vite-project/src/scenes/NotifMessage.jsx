import { useGetNotificationQuery, useDeleteNotificationMutation } from "../state/api"
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Card, CardActions, CardContent, Button, Typography, IconButton,  useMediaQuery, Skeleton } from '@mui/material';
import Header from "../Components/Header";
import { motion } from 'framer-motion';



const NotifMessage = () => {
  
  const [deleteNotification, { isLoading: deleteLoading }] =useDeleteNotificationMutation()
  const { data, isLoading } = useGetNotificationQuery();
  const [deletedId, setDeletedId] = useState('')
  const [success, setSuccess] = useState('')



  const handleDelete = async(id)=>{
    try {
      await deleteNotification({id}).unwrap()
      console.log('deleted notification id:', id)
      setSuccess("notification deleted successfully")
      setDeletedId('')
    } catch (error) {
      console.error('Error deleting Notification:', error);
    }
  }
  console.log(data);

  if(!data){
    return <div>Loading</div>
  }

  return (
          <Box>
          <Box m="1.5rem 2.5rem">
            <Header title="Notifications" subtitle="Stay Informed with Your Recent Notifications" />
          </Box>
          {data.map(notification => (
            <motion.div
              key={notification.id}
              animate={{ opacity: 1, y: 0, rotate: 360, scale: 1 }} 
              transition={{ duration: 0.5 }} 
              style={{ marginBottom: "20px" }} 
            >
          <Card key={notification.id} sx={{ margin: "auto", width:"50%", mb:"20px", position:"relative" }}>
            <Typography sx={{fontSize:"14px", mb:'7px', textAlign:"center", mt:"20px"}}>Message: {notification.message}</Typography>
            <Typography sx={{fontSize:"12px" , mb:'14px', textAlign:"center"}}>Date: {new Date(notification.created_at).toLocaleString()}</Typography>
            <Typography sx={{fontSize:"12px" , textAlign:"center", mb:"5px", color:"gray"}}>EmpID: {notification.user_id}</Typography>
            <IconButton
              color="secondary"
              onClick={() => handleDelete(notification._id)}
              disabled={deleteLoading} 
              sx={{fontSize:"12px"}}
            >
              Delete
            </IconButton>
          </Card>
        </motion.div>
      ))}
            <Box sx={{  width: "50%", height: "300px", marginTop: "50px", marginBottom: "50px", margin: "auto", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
<Typography variant="h5" color="gray" textAlign="center">
Stay informed and on top of your tasks. Manage your notifications effectively to ensure you never miss an important update!
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
}

export default NotifMessage;