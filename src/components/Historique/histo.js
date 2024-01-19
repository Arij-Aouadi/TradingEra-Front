import React, { useEffect, useState } from 'react';

const Calculs = ({ positions, simulatedPrices, onUpdateCalculations }) => {
  const [netProfit, setNetProfit] = useState(0);
  const [grossLoss, setGrossLoss] = useState(0);
  const [grossProfit, setGrossProfit] = useState(0);

  useEffect(() => {
    const totalRevenu = positions.reduce((acc, position, index) => {
      const revenuPartiel = position.quantité * (simulatedPrices[index] - position.prixAchat);
      return acc + revenuPartiel;
    }, 0);

    const totalAchat = positions.reduce((acc, position) => acc + position.prixAchat * position.quantité, 0);

    const grossLoss = positions.reduce((acc, position, index) => {
      const currentPrice = simulatedPrices[index];
      const loss = position.quantité * (position.prixAchat - currentPrice);
      return acc + Math.max(0, loss);
    }, 0);

    const grossProfit = positions.reduce((acc, position, index) => {
      const currentPrice = simulatedPrices[index];
      const profit = position.quantité * (currentPrice - position.prixAchat);
      return acc + Math.max(0, profit);
    }, 0);

    const netProfit = totalRevenu - totalAchat;

    setNetProfit(netProfit);
    setGrossLoss(grossLoss);
    setGrossProfit(grossProfit);

    onUpdateCalculations({ netProfit, grossLoss, grossProfit });
  }, [positions, simulatedPrices, onUpdateCalculations]);

  return null;
};

export default Calculs;
