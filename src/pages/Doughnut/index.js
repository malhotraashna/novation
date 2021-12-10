import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// import * as brewer from 'chartjs-plugin-colorschemes/src/colorschemes/colorschemes.brewer';
import * as office from 'chartjs-plugin-colorschemes/src/colorschemes/colorschemes.office';
// import * as tableau from 'chartjs-plugin-colorschemes/src/colorschemes/colorschemes.tableau';

ChartJS.register(ArcElement, Tooltip, Legend);


export const data = {
  labels: ['January', 'February', 'March',
    'April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
      // Ref: https://nagix.github.io/chartjs-plugin-colorschemes/colorchart.html
      backgroundColor: office.BlueGreen6,
      data: [65, 59, 80, 81, 56]
    }
  ]
};

const DoughnutChart = () => {
  return (
    <div style={{ height: '55%', width: '55%' }}>
      <Doughnut
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

export default DoughnutChart;
