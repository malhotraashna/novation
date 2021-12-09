import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['January', 'February', 'March',
    'April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: [
        '#B21F00',
        '#C9DE00',
        '#2FDE00',
        '#00A6B4',
        '#6800B4'
      ],
      hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F'
      ],
      data: [65, 59, 80, 81, 56]
    }
  ]
};

const PieChart = () => {
  return (
    <div style={{ height: '55%', width: '55%' }}>
      <Pie
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
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
