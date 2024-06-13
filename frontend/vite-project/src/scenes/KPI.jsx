import { Box, Button, IconButton, Typography } from '@mui/material';
import { useGetKPIQuery, useDeleteKPIMutation ,useUpdateKPIMutation} from "../state/api";
import Header from "../Components/Header";
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { motion } from 'framer-motion';

const KPIPerformance = () => {
  const { data, isLoading } = useGetKPIQuery();
  const navigate = useNavigate();
  const theme = useTheme();
  const [deleteKPI, { isLoading: deleteLoading }] = useDeleteKPIMutation()
  const [success, setSuccess] = useState('');

  const handleDelete = async (id) => {
    try {
      await deleteKPI({ id }).unwrap();
      setSuccess("Delete KPI successfully");
    } catch (error) {
      console.error('Error deleting KPI:', error);
    }
  };

  const handleUpdate = (kpi) => {
    navigate("/updatekpi", { state: { kpi } });
  };

  const columns = [
    { field: "user_id", headerName: "ID", flex: 1 },
    { field: "tasks", headerName: "Tasks", flex: 0.5 },
    { field: "hours_worked", headerName: "Hours Worked", flex: 0.5 },
    {
      field: "quality_of_work",
      headerName: "Quality of Work",
      flex: 1,
      renderCell: (params) => {
        const { accuracy_completeness, timeliness, adherence_guidelines } = params.value;
        return (
          <div>
            Completeness: {accuracy_completeness}, Timeliness: {timeliness}, Adherence: {adherence_guidelines}
          </div>
        );
      }
    },
    {
      field: "kpi_score",
      headerName: "KPI Score",
      flex: 0.5,
      renderCell: (params) => {
        const value = params.value;
        return typeof value === 'number' ? value.toFixed(2) : value;
      }
    },
    {
      field: "date",
      headerName: "Date",
      flex: 0.5,
      renderCell: (params) => new Date(params.value).toDateString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleUpdate(params.row)}
            sx={{ color: 'gray', }}
          >
            <EditIcon sx={{fontSize:"13px"}} />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDelete(params.row._id)}
            disabled={deleteLoading}
            sx={{ color: 'gray' }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="KPI" subtitle="Tracking Performance Excellence" />
      <Box mt="40px" height="50vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "none",
            color: theme.palette.secondary[100],
            backgroundColor: theme.palette.background.alt
          },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: theme.palette.primary.alt },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[100]} !important`,
          }
        }}>
        <DataGrid
          loading={isLoading || !data}
          rows={data || []}
          columns={columns}
          getRowId={(row) => row._id}
          sx={{ color: 'white' }}
        />
        <Button
          sx={{ color: theme.palette.secondary[200], marginTop: "10px" }}
          onClick={() => navigate('/createkpi')}
        >
          Create KPI
        </Button>
      </Box>
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

export default KPIPerformance;
