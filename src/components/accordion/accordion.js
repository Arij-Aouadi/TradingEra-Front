import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'linear-gradient(135deg,#000000, #1e222d)'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
  
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const competitions = [
    {
      id: 'panel1',
      title: 'Qui peut participer à la compétition ?',
      content: `
      La participation à la compétition de trading sur Tradingera est ouverte à tous les utilisateurs qui répondent à certains critères d'éligibilité. Les participants doivent avoir un âge minimum de 18 ans, posséder un compte actif sur la plateforme`, 
    },
    {
      id: 'panel2',
      title: 'Y a-t-il des exigences spécifiques pour commencer à trader dans la compétition?',
      content: `
      Oui, pour participer à la compétition, les traders doivent créer un compte sur Tradingera, effectuer un dépôt initial spécifié, et respecter les règles de trading énoncées. Il est également nécessaire de se conformer aux lois et réglementations locales liées au trading financier. Consultez la section "Critères de Participation" de l'application pour obtenir des détails précis sur les exigences spécifiques.`,
    },
    {
      id: 'panel3',
      title: 'Quelles sont les récompenses pour les gagnants de la compétition ?',
      content: `
      Les participants les mieux classés auront la chance de remporter des prix attractifs, tels que des bonus de trading, des consultations avec des experts financiers, et des avantages exclusifs. Cependant, pour être éligible aux récompenses, les participants doivent maintenir un comportement de trading responsable tout au long de la compétition. Tout non-respect des règles éthiques peut entraîner la disqualification.`,
    },
  ];
  

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      {competitions.map((competition) => (
        <Accordion
          key={competition.id}
          expanded={expanded === competition.id}
          onChange={handleChange(competition.id)}
        >
          <AccordionSummary aria-controls={`${competition.id}d-content`} id={`${competition.id}d-header`}>
            <Typography>{competition.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{competition.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
