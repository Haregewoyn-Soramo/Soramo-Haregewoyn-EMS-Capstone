import { Box, Button } from '@mui/material';
import { useGetKPIQuery } from "../state/api";
import Header from "../Components/Header";
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const KPIPerformance = () => {
  const { data, isLoading } = useGetKPIQuery();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  console.log('data:', data);

  const handleClick = (event, path) => {
    setAnchorEl(event.currentTarget);
    navigate(path);
  };

  const columns = [
    {
      field: "user_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "tasks",
      headerName: "Tasks",
      flex: 0.5
    },
    {
      field: "hours_worked",
      headerName: "Hours Worked",
      flex: 0.5,
    },
    {
      field: "quality_of_work",
      headerName: "Quality of Work",
      flex: 1,
      renderCell: (params) => {
        const { accuracy_completeness, timeliness, adherence_guidelines } = params.value;
        const options = [
          { value: "accuracy_completeness", label: "Completeness" },
          { value: "timeliness", label: "Timeliness" },
          { value: "adherence_guidelines", label: "Adherence to Guidelines" }
        ];
        return (
          <select defaultValue="accuracy_completeness">
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}: {params.value[option.value]}
              </option>
            ))}
          </select>
        );
      }
    },
    {
      field: "kpi_score",
      headerName: "KPI Score",
      flex: 0.5,
      renderCell: (params) => {
        const value = params.value;
        if (typeof value === 'number') {
          return value.toFixed(2);
        } else {
          return value;
        }
      }
    },
    {
      field: "date",
      headerName: "Date",
      flex: 0.5,
      renderCell: (params) => {
        const valueDate = params.value;
        const newDate = new Date(valueDate).toDateString();
        return newDate;
      }
    }
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="KPI" subtitle="Tracking Performance Excellence" />
      <Box mt="40px" height="50vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none"
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none"
          },
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "none",
            color: theme.palette.secondary[100],
            backgroundColor: theme.palette.background.alt
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.alt
          },
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
        />
        <Button sx={{ color: theme.palette.secondary[200], marginTop: "10px" }} onClick={(event) => handleClick(event, '/createkpi')}>
          Create KPI
        </Button>
      </Box>
    </Box>
  );
};

export default KPIPerformance;
