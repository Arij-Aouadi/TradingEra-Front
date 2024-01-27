import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import axiosInstance from '../../axios';

export default function Competition() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/ranku', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        const dataWithIds = response.data.map((item, index) => ({ id: index + 1, ...item }));
        setData(dataWithIds);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const renderTable = () => (
    <Table>
      <TableHead>
        <TableRow>

          <TableCell>         
          <Typography sx={{ color: '#EEC4C9', fontSize: ' 1.5 rem'   }}>
                 Rank         
                </Typography>
          </TableCell>

          <TableCell>         
          <Typography sx={{ color: '#EEC4C9', fontSize: ' 1.5 rem'   }}>
                 Username        
                </Typography>
          </TableCell>
          <TableCell >
          <Typography sx={{ color: '#EEC4C9', fontSize: ' 1.5 rem' }}>
                       Revenu   
                </Typography>
          
            </TableCell>
        </TableRow>
      </TableHead>
      <tbody>
        {data.map((row) => (
          <TableRow key={row.rank}>
            <TableCell><Typography sx={{fontSize: ' 1rem'  }}>
                     {row.rank}  
                </Typography></TableCell>
            <TableCell > <Typography  sx={{fontSize: ' 1rem'   }}>
                      {row.username}
                </Typography></TableCell>
            <TableCell > <Typography  sx={{fontSize: ' 1rem'   }}>
                     {row.revenue}
                </Typography></TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );

  return (
    <TableContainer component={Paper}>
      {renderTable()}
      <Typography variant="body2">
        Tradez plus pour améliorer votre classement. Consultez nos analyses de marché pour des opportunités lucratives. Les performances passées ne garantissent pas les résultats futurs. Investissez de manière responsable.
      </Typography>
    </TableContainer>
  );
}
