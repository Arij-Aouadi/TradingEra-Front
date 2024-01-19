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
  
    const renderTableBody = () => {
      // Ajoutez une ligne fictive de données pour tester le défilement
      return (
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell align="right">JohnDoe</TableCell>
          <TableCell align="right">10%</TableCell>
          <TableCell align="right">$100</TableCell>
        </TableRow>
      );
    }
  
    return (
      <TableContainer component={Paper} sx={{ height: 'auto', background: 'linear-gradient(135deg,#000000, #1e222d)', border: 'none', overflow: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { width: '0' } }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {renderTableHead()}
          {/* Ajoutez le corps du tableau */}
          {renderTableBody()}
        </Table>
      </TableContainer>
    );
  }


