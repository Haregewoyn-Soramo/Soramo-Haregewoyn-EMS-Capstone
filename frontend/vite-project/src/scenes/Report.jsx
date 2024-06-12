import Header from "../Components/Header";
import { useGetReportQuery } from "../state/api";
import { Box, Divider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Report = () => {
  const { data, isLoading } = useGetReportQuery();
  console.log("data:", data);

  const columns = [
    {
      field: "content",
      headerName: "Content",
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => {
        const date = new Date(params.value).toLocaleString();
        return date;
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Reports Dashboard" subtitle="Generate, View, and Export Reports" />
      <DataGrid  sx={{color:"white"}} 
        loading={isLoading || !data}
        rows={data || []}
        columns={columns}
        getRowId={(row) => row._id}
      />
      <Divider/>

      

    </Box>


  );
};

export default Report;
