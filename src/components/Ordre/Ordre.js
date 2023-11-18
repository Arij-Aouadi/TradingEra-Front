import React, { useState } from 'react'
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import './assests/styling.css'
import { Grid, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axiosInstance from '../../axios';


const Ordre = () => {
  const [typeOrdre, setTypeOrdre] = useState('');
  const [validite, setValidite] = useState('');
  const TypeStatut = {
    ouvert: "ouvert",
    ferme: "ferme",};
  const [statut, setStatut] = useState(TypeStatut.ouvert);
  const TypeTransaction = {
    Buy :"Buy",
    Sell:"Sell",
  };
  const [typetransaction, setTypeTransaction] = useState('');

  const handleChangeTypeOrdre = (event) => {
    setTypeOrdre(event.target.value);
    console.log('Valeur de typeOrdre :', event.target.value);
};   const handleChangeValidite = (event) => {
    setValidite(event.target.value);};
    const [quantite, setQuantite] = useState(''); 
    const handleChangeQuantite = (event) => {
      setQuantite(event.target.value);
    };
    const [prixOrdre, setPrixOrdre] = useState(''); 
    const handleChangePrixOrdre = (event) => {
     setPrixOrdre(event.target.value);
   };
   const [prixStop, setPrixStop] = useState(''); 
   const handleChangePrixStop = (event) => {
    setPrixStop(event.target.value);
  };
  const [prixProfit, setPrixProfit] = useState(''); 
   const handleChangePrixProfit = (event) => {
    setPrixProfit(event.target.value);
  };
        const addOrdre = (ordreData) => {
          axiosInstance
            .post('/Ordre/add', ordreData)
            .then((res) => {
              console.log('Ordre ajouté avec succès :', res.data);
              })
            .catch((err) => {
              console.error("Erreur lors de l'ajout de l'ordre :", err);
              
            });
        };
       
      
        const handleAjouterOrdre = () => {
          const ordreAAjouter = {
            typeOrdre: typeOrdre,
            quantite,
            prixOrdre,
            dureeValiditeOrdre: validite,
            statut,
            prixStop,
            prixProfit,
            typetransaction,
            
          };
          console.log('Données de l\'ordre :', ordreAAjouter);

          addOrdre(ordreAAjouter);
        };

  return (
    <Grid container Spacing={0} sx={{}}>
        <Grid item xs={12} sx={{display:'flex',justifyContent:'space-evenly'}}>
        <AwesomeButton type="primary" className="aws-btn"   onPress={() => {
    setTypeTransaction(TypeTransaction.Sell);
    handleAjouterOrdre();
  }}
>Sell</AwesomeButton>
        <AwesomeButton type="secondary" className="aws-btn"   onPress={() => {
    setTypeTransaction(TypeTransaction.Buy);
    handleAjouterOrdre();
  }}
>Buy</AwesomeButton>

        </Grid>

        <Grid item xs={12} sx={{display:'flex',justifyContent:'space-between'}}>
        <FormControl size='small' sx={{ m: 1, minWidth: 135 }}>
        <Typography sx={{fontSize: '9px',mb:0.25}}>Type ordre</Typography>
        <Select
          value={typeOrdre}
          onChange={handleChangeTypeOrdre}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{height:'30px'}}
        >
          <MenuItem value={"Limite"}>Limite</MenuItem>
          <MenuItem value={"Marché"}>Marché</MenuItem>
          <MenuItem value={"Stop"}>Stop</MenuItem>
        </Select>
      </FormControl>

      <FormControl size='small' sx={{ m: 1, width: 135 }} variant="outlined">
          <Typography sx={{fontSize: '9px',mb:0.25}}>Quantité</Typography>
          <OutlinedInput
            size='small'
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end"></InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
            value={quantite}
            onChange={handleChangeQuantite}
            sx={{height:'30px'}}
          />
        
        </FormControl>
        
        </Grid>

        <Grid item xs={12} sx={{display:'flex',justifyContent:'space-between'}}>

        <FormControl size='small' sx={{ m: 1, width: 135 }} variant="outlined">
            <Typography sx={{fontSize: '9px',mb:0.25}}>{typeOrdre=="10"? "Prix Limite":"Prix de Marché"}</Typography>

                <OutlinedInput
                    size='small'
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end"></InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                    'aria-label': 'weight',
                    }}
                    value={prixOrdre}
                    onChange={handleChangePrixOrdre}
                    sx={{height:'30px'}}
                />
        </FormControl>
      
        <FormControl size='small' sx={{ m: 1, minWidth: 135 }}>
        <Typography sx={{fontSize: '9px',mb:0.25}}>Validité d'Ordre</Typography>
        <Select
          value={validite}
          onChange={handleChangeValidite}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{height:'30px'}}
        >
          <MenuItem value={"un jour"}>un jour</MenuItem>
          <MenuItem value={"jusqu'à l'annulation"}>jusqu'à l'annulation</MenuItem>
        </Select>
      </FormControl>
        </Grid>

        <Grid item xs={12} sx={{display:'flex',justifyContent:'space-between',ml:2,mr:2,fontSize:'8px'}}>
        <FormControlLabel control={<Checkbox defaultChecked size='small' sx={{fontSize:'8px'}} />} label="Stop-Loss"  />
        <FormControlLabel control={<Checkbox defaultChecked size='small' />} label="Take-Profit" labelPlacement="start" />
        </Grid>


        <Grid item xs={12} sx={{display:'flex',justifyContent:'space-between'}}>

        <FormControl size='small' sx={{ m: 1, width: 135 }} variant="outlined">
       
                <OutlinedInput
                    size='small'
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end"></InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                    'aria-label': 'weight',
                    }}
                    placeholder='prix du stop'
                    value={prixStop}
                    onChange={handleChangePrixStop}
                    sx={{height:'30px'}}
                />
        </FormControl>
      
        <FormControl size='small' sx={{ m: 1, width: 135 }} variant="outlined">
          <OutlinedInput
            size='small'
            id="outlined-adornment-weight"
            endAdornment={<InputAdornment position="end"></InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
            placeholder='prix du profit'
            value={prixProfit}
            onChange={handleChangePrixProfit}
            sx={{height:'30px'}}
          />
        </FormControl>
        
        </Grid>

       



    </Grid>
  )
}

export default Ordre
