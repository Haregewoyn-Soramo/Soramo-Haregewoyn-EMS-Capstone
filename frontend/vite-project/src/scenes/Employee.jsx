
import {Box} from '@mui/material';

import { useGetUsersQuery} from "../state/api";
import Header from "../Components/Header";
import{DataGrid} from '@mui/x-data-grid'
import { useTheme } from '@emotion/react';





const EmployeesOfCompany  = () => {
  const { data, isLoading } = useGetUsersQuery();
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
    </Box>
  );
};

export default EmployeesOfCompany ;
