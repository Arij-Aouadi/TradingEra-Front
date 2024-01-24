import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axiosInstance from '../../axios';

const HistoricalDataGrid = () => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/historique', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        const dataWithIds = response.data.map((item, index) => ({ id: index + 1, ...item }));
        setRowData(dataWithIds);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);
  const columns = [
    { field: 'dateOrdre', headerName: 'Date', width: 150 },
    { field: 'typeordre', headerName: 'Type d\'ordre', width: 150 },
    { field: 'symbole', headerName: 'Symbole', width: 150 },
    { field: 'quantity', headerName: 'Quantité', width: 150 },
    { field: 'prixOrdre', headerName: 'Prix d\'ordre', width: 150 },
    // Ajoutez d'autres colonnes si nécessaire
  ];

  return (
    <div style={{ height: '400px', width: '100%', overflow: 'hidden' }}>
      <DataGrid
        rows={rowData}
        columns={columns}
        disableSelectionOnClick
        disableColumnMenu
        hideFooterPagination={false}
        autoHeight={false}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        pagination
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
};

export default HistoricalDataGrid;
