import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material';

const StyledDataGrid = styled({
  root: {
    "& .MuiDataGrid-renderingZone": {
      maxHeight: "none !important"
    },
    "& .MuiDataGrid-cell": {
      lineHeight: "unset !important",
      maxHeight: "none !important",
      whiteSpace: "normal"
    },
    "& .MuiDataGrid-row": {
      maxHeight: "none !important"
    }
  }
})(DataGrid);

export default StyledDataGrid