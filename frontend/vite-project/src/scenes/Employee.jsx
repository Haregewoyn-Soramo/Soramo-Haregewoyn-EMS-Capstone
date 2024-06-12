import { motion } from 'framer-motion';
import {Box,IconButton, Button, Typography} from '@mui/material';
import { useGetUsersQuery, useDeleteUsersMutation} from "../state/api";
import Header from "../Components/Header";
import{DataGrid} from '@mui/x-data-grid'
import { useTheme } from '@emotion/react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';




const EmployeesOfCompany  = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { data, isLoading } = useGetUsersQuery();
  const [deleteUser, {isLoading: deleteLoading}] = useDeleteUsersMutation()
  const [success, setSuccess] = useState('')
  const [deletedId, setDeletedId] = useState('')


  const handleDelete = async(id)=>{
     try {
       await deleteUser({id}).unwrap()
       setSuccess("user successfully deleted", id)
       setDeletedId('')
     } catch (error) {
      console.error('Error deleting User:', error);
     }
  }

  const handleClick =(event, path)=>{
    setAnchorEl(event.currentTarget);
    navigate(path)
  }

  console.log('data:', data);
  const theme = useTheme()

  const columns = [
    {field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {field: "name",
      headerName: "Name",
      flex: 0.5,
    },
      {field: "role",
      headerName: "Role",
      flex: 0.5,
      },
      {field: "email",
      headerName: "Email",
      flex: 1,
      },
      {field: "position",
      headerName: "Position",
      flex: 0.5,
      },
      {field: "department",
      headerName: "Department",
      flex: 0.5,
      },
      {
        field: "phone_number",
        headerName: "Phone Number",
        flex: 0.5,
        renderCell: (params) => {
          const phoneNumber = params.value.toString();
          const formattedPhoneNumber = phoneNumber.replace(/^(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
          return formattedPhoneNumber;
        }
      },
      {
        field: "actions",
        headerName: "Actions",
        flex: 0.5,
        renderCell: (params) => (
          <IconButton
            color="secondary"
            onClick={() => handleDelete(params.row._id)}
            disabled={deleteLoading}
            sx={{color:'gray'}}
          >
            <DeleteIcon />
          </IconButton>
        )
      }
  ]

  return (
    <Box m="1.5rem 2.5rem" >
      <Header title="Employees" subtitle="Committed to Excellence" />
      <Box mt="40px" height= "75vh" 
      sx={{
        "&.MuiDataGrid-root":{
          border: "none"
        },
        "&.MuiDataGrid-cell":{
          border: "none"
        },
        "&.MuiDataGrid-ColumnHeaders":{
          borderBottom: "none",
          color: theme.palette.secondary[100],
          backgroundColor:theme.palette.background.alt
        },
        "&.MuiDataGrid-virtualScroller":{
          backgroundColor:theme.palette.primary.alt
        },
        "&.MuiDataGrid-footerContainer":{
          borderTop: "none",
          backgroundColor:theme.palette.background.alt,
          color: theme.palette.secondary[100],
        },
        "&.MuiDataGrid-toolbarContainer .muiButton-text":{
          color: `${theme.palette.secondary[100]} !important` ,
        }
      }}>
        <DataGrid  loading = {isLoading || !data} rows={data || []} columns={columns} getRowId={(row)=> row._id}/>
      </Box>
      <Button sx={{ color: theme.palette.secondary[200], marginTop: "10px" }} onClick={(event) => handleClick(event, '/addemployee')}>
        Add Employee
      </Button>
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

export default EmployeesOfCompany ;
