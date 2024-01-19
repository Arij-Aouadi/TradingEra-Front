import React from 'react';
import { Chart as chartJS } from 'chart.js/auto';

import { Line } from 'react-chartjs-2';

const CumulativeReturnsChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: 'Rendement Cumulatif',
        data: data.map((item) => item.cumulativeReturn),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        lineTension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
      y: {
        type: 'linear',
        position: 'left',
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default CumulativeReturnsChart;
