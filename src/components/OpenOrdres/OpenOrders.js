import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axiosInstance from '../../axios';

export default function OpenOrders({tab}) {
  const [openOrders,setOpenOrders]=React.useState([])
  const [positions,setPositions]=React.useState([])


  const renderTableHead = () => {
    if (tab=="2") {
        return (
            <TableHead sx={{mb:10}} >
            <TableRow sx={{border:'none'}}>
            <TableCell sx={{border:'none',padding:'3px',fontWeight:700,color:'lightgrey',fontFamily:'Orbitron'}}>Symbole</TableCell>
            <TableCell align="right" sx={{border:'none',padding:'3px',fontWeight:700,color:'lightgrey',fontFamily:'Orbitron'}}>Nom</TableCell>
            <TableCell align="right" sx={{border:'none',padding:'3px',fontWeight:700,color:'lightgrey',fontFamily:'Orbitron'}}>Parts</TableCell>
            <TableCell align="right" sx={{border:'none',padding:'3px',fontWeight:700,color:'lightgrey',fontFamily:'Orbitron'}}>valeur Actuelle</TableCell>
            <TableCell align="right"sx={{border:'none',padding:'3px',fontWeight:700,color:'lightgrey',fontFamily:'Orbitron'}}>Prix d'achat</TableCell>
            <TableCell align="right"sx={{border:'none',padding:'3px',fontWeight:700,color:'lightgrey',fontFamily:'Orbitron'}}>Variation</TableCell>
          </TableRow>
        </TableHead>
        );
    }
    else {
        return(
            <TableHead sx={{mb:10}} >
            <TableRow sx={{border:'none'}}>
            <TableCell sx={{border:'none',padding:'3px',fontWeight:700,color:'lightgrey',fontFamily:'Orbitron'}}>Symbole</TableCell>
            <TableCell align="right" sx={{border:'none',padding:'3px',fontWeight:700,color:'lightgrey',fontFamily:'Orbitron'}}>Type Symbole</TableCell>
            <TableCell align="right" sx={{border:'none',padding:'3px',fontWeight:700,color:'lightgrey',fontFamily:'Orbitron'}}>Type Ordre</TableCell>
            <TableCell align="right" sx={{border:'none',padding:'3px',fontWeight:700,color:'lightgrey',fontFamily:'Orbitron'}}>Quantité</TableCell>
            <TableCell align="right"sx={{border:'none',padding:'3px',fontWeight:700,color:'lightgrey',fontFamily:'Orbitron'}}>Prix</TableCell>
            <TableCell align="right"sx={{border:'none',padding:'3px',fontWeight:700,color:'lightgrey',fontFamily:'Orbitron'}}>Validité d'ordre</TableCell>
          </TableRow>
        </TableHead>
        
        );
    }
  } 

  const renderTableBody = () => {
    if (tab==2) {
       return(
        <TableBody sx={{border:'none' }}>
        {positions.map((position) => (
          <TableRow
            key={position.idP}
            sx={{ '&:last-child td, &:last-child th': { border: 0 }  }}
          >
            <TableCell sx={{border:'none',padding:'3px'}} component="th" scope="row">
              {position.symbole}
            </TableCell>
            <TableCell align="right" sx={{border:'none',padding:'3px',fontFamily:'Orbitron'}}>{position.nom}</TableCell>
            <TableCell align="right" sx={{border:'none',padding:'3px',fontFamily:'Orbitron'}}>{position.quantité}</TableCell>
            <TableCell align="right" sx={{border:'none',padding:'3px',fontFamily:'Orbitron'}}>{position.valeurActuelle}</TableCell>
            <TableCell align="right" sx={{border:'none',padding:'3px',fontFamily:'Orbitron'}}>{position.prixAchat}</TableCell>
            <TableCell align="right" sx={{border:'none',padding:'3px',fontFamily:'Orbitron'}}>{position.variation}</TableCell>
            
          </TableRow>
        ))}
      </TableBody>
       ); 
    }
    else {
        return(
            <TableBody sx={{border:'none' }}>
            {openOrders.map((ordres) => (
              <TableRow
                key={ordres.idO}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }  }}
              >
                <TableCell sx={{border:'none',padding:'3px'}} component="th" scope="row">
                  {ordres.symbol}
                </TableCell>
                <TableCell align="right" sx={{border:'none',padding:'3px',fontFamily:'Orbitron'}}>{ordres.typeSymbol}</TableCell>
                <TableCell align="right" sx={{border:'none',padding:'3px',fontFamily:'Orbitron'}}>{ordres.typetransaction}</TableCell>
                <TableCell align="right" sx={{border:'none',padding:'3px',fontFamily:'Orbitron'}}>{ordres.quantite}</TableCell>
                <TableCell align="right" sx={{border:'none',padding:'3px',fontFamily:'Orbitron'}}>{ordres.prixOrdre}</TableCell>
                <TableCell align="right" sx={{border:'none',padding:'3px',fontFamily:'Orbitron'}}>{ordres.dureeValiditeOrdre}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        );
    }
  }

  React.useEffect(() => {
    axiosInstance
      .get('/ordre/showall')
      .then((res) => {
        setOpenOrders(res.data);
      })
      .catch((err) => {
        console.log(err)
      });

      axiosInstance.get('/Position/showall').then((res) => {
        const dataWithIds = res.data.map((item, index) => ({ id: index + 1, ...item }));
        setPositions(dataWithIds);
      })
      .catch((err) => {
        console.log(err)
      });
      
  }, []);

  return (
    <TableContainer component={Paper} sx={{height: '32vh',
    background:`linear-gradient(135deg,#000000, #1e222d)`,
    border:'none',
    overflow:1,scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
        width: '0',
      } }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        {renderTableHead()}
        {renderTableBody()}
      </Table>
    </TableContainer>
  );
}