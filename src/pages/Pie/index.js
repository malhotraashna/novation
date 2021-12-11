import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  return (
    <div style={{ height: '55%', width: '55%' }}>
      <Pie
        data={data}
        options={{
          plugins: {
            title: {
              display: false,
              text: 'Average Rainfall per month',
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

export default PieChart;
