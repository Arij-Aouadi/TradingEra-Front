import React from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';

  export default function Competition() {

    const renderTableHead = () => {
      return (
        <TableHead sx={{ mb: 10 }}>
          <TableRow sx={{ border: 'none' }}>
            <TableCell sx={{ border: 'none', padding: '3px', fontWeight: 700, color: 'lightgrey' }}>Rank</TableCell>
            <TableCell align="right" sx={{ border: 'none', padding: '3px', fontWeight: 700, color: 'lightgrey' }}>Nickname</TableCell>
            <TableCell align="right" sx={{ border: 'none', padding: '3px', fontWeight: 700, color: 'lightgrey' }}>PNL%</TableCell>
            <TableCell align="right" sx={{ border: 'none', padding: '3px', fontWeight: 700, color: 'lightgrey' }}>Expected Reward</TableCell>
          </TableRow>
        </TableHead>
      );
    }
    
      

      return ( 
        <TableContainer component={Paper} sx={{ height: '32vh', background: 'linear-gradient(135deg,#000000, #1e222d)', border: 'none', overflow: 1, scrollbarWidth: 'none', '&::-webkit-scrollbar': { width: '0' } }}>
        
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {renderTableHead()}
        </Table>
      </TableContainer>
    );
  
}




