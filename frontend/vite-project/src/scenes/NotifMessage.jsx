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
              <Box backgroundColor="rgba(29, 33, 38, 0.4)" padding='20px' >
              <Box m="1.5rem 2.5rem">
        <Header title="Notifications" subtitle="Stay Informed with Your Recent Notifications" />
      </Box>
      <Box display="flex" gap="1rem" mt="70px">
        <Card sx={{ background: "#010B13", borderRadius: "30px", display: 'flex', flexDirection: 'column', flex: '40%', justifyContent: 'space-between',color:"white"}}>
          {data.map(notification => (
            <motion.div
              key={notification.id}
              animate={{ opacity: 1, y: 0, rotate: 360, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: "20px", mb:"10px", width: '100%'}}
            >
              <CardContent>
                <Typography sx={{ fontSize: "14px", mb: '7px', textAlign: "center", mt: "20px" }}>Message: {notification.message}</Typography>
                <Typography sx={{ fontSize: "12px", mb: '14px', textAlign: "center" }}>Date: {new Date(notification.created_at).toLocaleString()}</Typography>
                <Typography sx={{ fontSize: "12px", textAlign: "center", mb: "5px", color: "gray" }}>EmpID: {notification.user_id}</Typography>
              </CardContent>
              <CardActions style={{ justifyContent: 'center' }}>
                <IconButton
                  color="secondary"
                  onClick={() => handleDelete(notification._id)}
                  disabled={deleteLoading}
                  sx={{ fontSize: "12px", ml: '2rem' }}
                >
                  Delete
                </IconButton>
              </CardActions>
            </motion.div>
          ))}
        </Card>
        <Card sx={{ background: `url('https://media.istockphoto.com/id/1347264157/photo/businessman-holding-smartphone-with-virtual-yellow-bell-ringing-for-application-notification.jpg?b=1&s=612x612&w=0&k=20&c=UaFBlfBGl-n_eZGBO37RQ0lrCW2Gh7xLwolb8419iHM=')`, width: '60%', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }} >
        </Card>
      </Box>
      <Box sx={{ width: "50%", height: "300px", marginTop: "50px", marginBottom: "50px", margin: "auto", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h5" color="gray" textAlign="center">
          Stay informed and on top of your tasks. Manage your notifications effectively to ensure you never miss an important update!
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
    }

export default NotifMessage;