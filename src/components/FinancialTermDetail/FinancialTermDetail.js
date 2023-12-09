import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';

const FinancialTermDetail = () => {
  const { id } = useParams();
  const [financialTerm, setFinancialTerm] = useState({
    term: '',
    definition: '',
    imageUrl: '', // Assurez-vous que imageUrl est initialisé à une chaîne vide
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    // Au chargement de la page, récupérez l'URL de l'image depuis le stockage local
    const savedImageUrl = localStorage.getItem(`imageUrl_${id}`);
    if (savedImageUrl) {
      setFinancialTerm((prevTerm) => ({ ...prevTerm, imageUrl: savedImageUrl }));
    }

    // Chargez les détails du FinancialTerm depuis votre backend ici
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

        // Sauvegardez l'URL de l'image dans le stockage local
        localStorage.setItem(`imageUrl_${id}`, imageUrl);

        // Assurez-vous que setFinancialTerm est correctement utilisé ici
        setFinancialTerm((prevTerm) => ({ ...prevTerm, imageUrl }));
      } else {
        console.error('Erreur lors du téléchargement du fichier');
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier:', error);
    }
  };

  const handleFileChange = (event) => {
    // Gérez le changement de fichier ici
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  console.log("Financial Term State:", financialTerm);

  if (!financialTerm) {
    return <div>Loading...</div>;
  }

  return (
    <Paper sx={{ height: '90vh', justifyContent: 'center', background: `linear-gradient(135deg,#000000, #1e222d)`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ fontSize: '3.5rem', color: '#3498db', marginBottom: '10px', marginLeft: '20px' }}>{financialTerm.term}</h2>
      <p style={{ fontSize: '1.5rem', color: 'white', marginBottom: '10px', textAlign: 'center' }}>{financialTerm.definition}</p>

      {/* Afficher le bouton "Choose File" pour chaque FinancialTerm */}
      <input type="file" onChange={handleFileChange} />

      {/* Afficher le bouton "Upload File" */}
      <button onClick={handleFileUpload}>Upload File</button>

      {/* Afficher l'image */}
      {financialTerm.imageUrl && (
        <img src={financialTerm.imageUrl} alt="Financial Term" style={{ maxWidth: '100%', maxHeight: '400px' }} />
      )}
    </Paper>
  );
};

export default FinancialTermDetail;
