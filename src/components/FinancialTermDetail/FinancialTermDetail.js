import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ChatBot from '../ChatBot/ChatBot';
import YourImage from './Images/qe.jpg';


const FinancialTermDetail = () => {
  const { id } = useParams();
  const [financialTerm, setFinancialTerm] = useState({
    term: '',
    definition: '',
    imageUrl: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  useEffect(() => {
    const savedImageUrl = localStorage.getItem(`imageUrl_${id}`);
    if (savedImageUrl) {
      setFinancialTerm((prevTerm) => ({ ...prevTerm, imageUrl: savedImageUrl }));
    }

    fetch(`http://localhost:1010/financial-terms/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log("Financial Term Data:", data);
        setFinancialTerm(data);
      })
      .catch(error => console.error('Erreur lors de la récupération des données du FinancialTerm:', error));
  }, [id]);

  const handleFileUpload = async () => {
    if (!selectedFile) {
      console.error('Veuillez sélectionner un fichier.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:1010/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const imageUrl = await response.text();
        console.log('Chemin du fichier téléchargé :', imageUrl);

        localStorage.setItem(`imageUrl_${id}`, imageUrl);

        setFinancialTerm((prevTerm) => ({ ...prevTerm, imageUrl }));
      } else {
        console.error('Erreur lors du téléchargement du fichier');
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier:', error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <Paper style={{ padding: '20px', position: 'relative', height: '90vh' }}>
      <h2 style={{ fontSize: '48px',fontFamily: 'Orbitron', color: '#3498db', marginBottom: '10px', marginLeft: '300px' , justifyContent: 'center', }}>
        {financialTerm.term}
      </h2>
      <p style={{ fontSize: '18px',fontFamily: 'Orbitron', color: 'white', marginBottom: '10px', justifyContent: 'center', textAlign: 'center' }}>
        {financialTerm.definition}
      </p>

      {financialTerm.imageUrl && (
  <div style={{ marginTop: '20px' }}>
  {financialTerm.imageUrl.toLowerCase().endsWith('.mp4') ? (
            <video controls style={{ maxWidth: '100%', maxHeight: '800px' }}>
              <source src={financialTerm.imageUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={financialTerm.imageUrl} alt="Financial Term" style={{ maxWidth: '100%', maxHeight: '400px' }} />
          )}
        </div>
      )}

{financialTerm.videoUrl && (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '45px' }}>
    <video controls style={{ maxWidth: '100%', maxHeight: '400px', margin: 'auto' }}>
      <source src={financialTerm.videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
)}

<div style={{ position: 'absolute', bottom: '20px', right: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <img
          src={YourImage}
          alt="Your Image"
          style={{
            objectFit: 'cover',
            borderRadius: '10px',
            maxWidth: '20%', // Ajustez la taille selon vos besoins
            maxHeight: '20%', // Ajustez la taille selon vos besoins
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsChatBotOpen(!isChatBotOpen)}
          sx={{
            backgroundColor: 'dodgerblue',
            marginTop: 2,
            fontSize: '5rem',
            color: 'black',
            fontFamily: 'Orbitron',
            fontSize: 20,
          }}
        >
          {isChatBotOpen ? 'Help ?' : 'Help ?'}
        </Button>
      </div>

      {isChatBotOpen && (
        <div style={{ position: 'absolute', bottom: '80px', right: '20px', zIndex: 1, width: '300px'  , background: 'linear-gradient(135deg, #000000, #1e222d)' }}>
          <ChatBot />
        </div>
      )}
    </Paper>
  );
};

export default FinancialTermDetail;
