import { useGetTaskQuery } from "../state/api";
import Header from "../Components/Header";
import { Box, Card, CardActions, CardContent, Button, Typography, Rating, useTheme, useMediaQuery, Collapse } from '@mui/material';
import { useState } from "react";
import {
  HourglassEmptyOutlined,
  AutorenewOutlined,
  CheckCircleOutline,
  ErrorOutline,
} from '@mui/icons-material';



const getStatusIcon = (status) => {
  switch (status) {
    case 'pending':
      return <HourglassEmptyOutlined sx={{color: 'orange', width:"18px", height: "18px", mb: "-5px", ml: "5px"}}/>;
    case 'in_progress':
      return <AutorenewOutlined  sx={{color: 'blue',  width:"18px", height: "18px", mb: "-5px", ml: "5px"}}/>;
    case 'completed':
      return <CheckCircleOutline sx={{color: 'green',  width:"18px", height: "18px", mb: "-5px", ml: "5px"}} />;
    case 'overdue':
      return <ErrorOutline  sx={{color: 'red',  width:"18px", height: "18px", mb: "-5px", ml: "5px"}}/>;
    default:
      return null;
  }
};






const Task = ({
  title,
  description,
  status,
  priority,
  deadline,
  created_at,
  user_id,
  updated_at
}) => {
      const theme = useTheme()
      const [isExpanded, setIsExpanded] = useState(false)

      return(
        <Card sx={{backgroundImage: "none", borderRadius: " 0.55rem", backgroundColor: theme.palette.background.alt}}>
            <CardContent>
              <Typography variant="h5" component="div" sx={{mb: "1.5rem"}}>
                          Title: {title}
               </Typography>
               <Typography sx={{fontSize : 12, mb: "1.2rem", fontWeight:"bold"}} color= "#666" gutterBottom>
                           Priority: {priority}
               </Typography>
               <Typography sx={{mb: "1.2rem"}} color="#666">
                        Deadline: {new Date(deadline).toLocaleString()}
               </Typography>
               <Typography sx={{mb: "1.2rem"}} color="#666">
                            Status: {status}{getStatusIcon(status)}
               </Typography>
            </CardContent>
            <CardActions>
              <Button variant="primary" size="small" sx={{fontSize:"10px"}} onClick={() => setIsExpanded(!isExpanded)}>
                  See More
              </Button>
            </CardActions>
            <Collapse in = {isExpanded} timeout="auto" unmountOnExit sx={{ color: theme.palette.neutral[300]}}>
              <CardContent>
              <Typography sx={{mb: "1.2rem"}}>
                    Description: {description}
               </Typography>
                <Typography> EmpID: {user_id}</Typography>
                <Typography> created_at: {new Date(created_at).toLocaleString()}</Typography>
                <Typography> updated_at: {new Date(updated_at).toLocaleString()}</Typography>
              </CardContent>
            </Collapse>
         </Card>
      )
    }
    


const Tasks = () => {

  const {data, isLoading} = useGetTaskQuery();
  console.log('data:', data)
  const isNoneMobile = useMediaQuery("(min-width: 1000px)")
  return(
    <Box m="1.5rem 2.5rem">
      <Header title="Tasks" subtitle="Track and Manage Your Assigned Tasks" />
      {data || !isLoading ?(
              <Box mt = "20px" display="grid"
                   gridTemplateColumns="repeat(4, minmax(0, 1fr))" 
                   justifyContent="space-between"
                   rowGap= "20px"
                   columnGap="1.33%"
                   sx={{"& > div": {gridColumn: isNoneMobile ? undefined : "span 4"}}} >
                 {data.map(
                                 ({title,
                                  description,
                                  status,
                                  priority,
                                  deadline,
                                  created_at,
                                  user_id,
                                  updated_at}) =>(
                                     <Task
                                     key={user_id}
                                     title={title}
                                     description={ description}
                                     status={status}
                                     priority={priority}
                                     deadline={deadline}
                                     created_at={created_at}
                                     user_id={user_id}
                                     updated_at={updated_at}/>
                                  )
                                  )}
              </Box> ): 
      ( <> Loading...</>)}
    </Box>
  )
};

export default Tasks;