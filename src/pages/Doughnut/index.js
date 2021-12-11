import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data }) => {
  return (
    <div style={{ height: '55%', width: '55%' }}>
      <Doughnut
        data={data}
        options={{
          plugins: {
            title: {
              display: false,
              text: 'Co-pilot Doughnut',
              fontSize: 5
            },
            legend: {
              display: true,
              position: 'right'
            }
          }
        }}
      />
    </div>
  );
};

export default DoughnutChart;
