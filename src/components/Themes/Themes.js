import React, { useEffect, useState } from 'react';
import YourImage from './Images/shutterstock_1777779812_tablet.jpg';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Routes, Route, Link, useParams } from 'react-router-dom';  // Inclure useParams


const Themes = () => {
  const [themesData, setThemesData] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedThemeFinancialTerms, setSelectedThemeFinancialTerms] = useState([]);

  const generateBlueShade = (index) => {
    const startColor = '#3498db'; // Couleur de départ (bleu)
    const endColor = '#1e90ff'; // Couleur de fin (bleu plus clair)
    const steps = 20; // Utiliser le nombre total de thèmes comme le nombre total d'étapes

    const r1 = parseInt(startColor.slice(1, 3), 16);
    const g1 = parseInt(startColor.slice(3, 5), 16);
    const b1 = parseInt(startColor.slice(5, 7), 16);

    const r2 = parseInt(endColor.slice(1, 3), 16);
    const g2 = parseInt(endColor.slice(3, 5), 16);
    const b2 = parseInt(endColor.slice(5, 7), 16);

    const r = Math.round(r1 + (r2 - r1) * (index / steps)).toString(16).padStart(2, '0');
    const g = Math.round(g1 + (g2 - g1) * (index / steps)).toString(16).padStart(2, '0');
    const b = Math.round(b1 + (b2 - b1) * (index / steps)).toString(16).padStart(2, '0');

    return `#${r}${g}${b}`;
  };

  const handleThemeClick = (theme) => {
    console.log("Theme Clicked:", theme);
    setSelectedTheme(theme);
  
    fetch(`http://localhost:1010/financial-terms/theme/${theme.id}`)
      .then(response => response.json())
      .then(data => {
        console.log("Financial Terms for Theme:", data);
        setSelectedThemeFinancialTerms(data);
      })
      .catch(error => console.error('Erreur lors de la récupération des données des termes financiers:', error));
  };
  
  
  
  const handleTermClick = (e, financialTerm) => {
    e.stopPropagation(); // Empêche la propagation du clic à l'élément parent (li)
    // Naviguez vers les détails du terme financier
    window.location.href = `/financial-term/${financialTerm.id}`;
  };

  console.log("Themes Data:", themesData);
  console.log("Selected Theme:", selectedTheme);
  console.log("Selected Theme Financial Terms:", selectedThemeFinancialTerms);



  useEffect(() => {
    // Chargez les données depuis votre backend ici
    fetch('http://localhost:1010/themes')
      .then(response => response.json())
      .then(data => {
        setThemesData(data);
      })
      .catch(error => console.error('Erreur lors de la récupération des données des thèmes:', error));
  }, []);

  // ...

const FinancialTermDetail = ({ match }) => {
  const [financialTerm, setFinancialTerm] = useState(null);

  useEffect(() => {
    // Chargez les détails du FinancialTerm depuis votre backend ici
    fetch(`http://localhost:1010/financial-terms/${match.params.id}`)
      .then(response => response.json())
      .then(data => {
        setFinancialTerm(data);
      })
      .catch(error => console.error('Erreur lors de la récupération des données du FinancialTerm:', error));
  }, [match.params.id]);

  if (!financialTerm) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 className="financial-term-title">{financialTerm.term}</h2>
      <p style={{ fontSize: '1.5rem', color: '#555', marginBottom: '20px' }}>{financialTerm.definition}</p>
      {/* Autres détails du FinancialTerm */}
    </div>
  );
};

// ...

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, padding: '20px', textAlign: 'center' }}>
        {/* Utilisez l'image importée */}
        <img src={YourImage} alt="Your Image" style={{ width: '100%', height: '100vh', objectFit: 'cover', borderRadius: '10px' }} />
      </div>
      <div style={{ flex: 1, padding: '20px' }}>
        {/* Contenu à droite de la page, y compris la liste des thèmes */}
        <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
          <FontAwesomeIcon icon={faBook} style={{ marginRight: '10px' }} />
          Learn Trading
        </h2>
        <ul style={{ padding: '0', listStyle: 'none' }}>
          {themesData.map((theme) => (
            <li
              key={theme.id}
              style={{
                background: `linear-gradient(to right, ${generateBlueShade(theme.id)}, ${generateBlueShade(theme.id + 1)})`,
                padding: '15px',
                margin: '5px',
                color: '#fff',
                borderRadius: '5px',
                fontSize: '1rem',
                cursor: 'pointer',
              }}
              onClick={async () => await handleThemeClick(theme)}
              >
                {/* Utilisez le lien correct avec l'ID du terme financier */}
                <Link to={`/financial-term/${theme.id}`} style={{ color: '#fff', textDecoration: 'none' }}>
                  {theme.name}
                </Link>
                {/* Afficher la liste des FinancialTerm pour le thème sélectionné */}
                {selectedTheme && selectedTheme.id === theme.id && (
  <ul>
   {selectedThemeFinancialTerms.map((financialTerm) => (
  <li key={financialTerm.id} style={{ fontSize: '1.5rem', color: '#fff' }}>
    {/* Utilisez le lien correct avec l'ID du terme financier */}
    <div
      onClick={(e) => handleTermClick(e, financialTerm)}
      style={{
        color: '#fff',
        cursor: 'pointer',
        fontSize: '1rem', // Modifiez la taille de police ici
        textDecoration: 'none', // Assurez-vous que le soulignement est désactivé
      }}
    >
      {financialTerm.term}
    </div>
      </li>
    ))}
  </ul>
)}
              </li>
            ))}
          </ul>
          {/* Ajouter le bloc Switch et Route pour gérer les pages détaillées */}
          <Routes>
            <Route path="/financial-term/:id" element={<FinancialTermDetail />} />
          </Routes>
        </div>
      </div>
    );
  };





  
  export default Themes;