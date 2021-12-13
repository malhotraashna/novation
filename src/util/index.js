import axios from 'axios';
import * as office from 'chartjs-plugin-colorschemes/src/colorschemes/colorschemes.office';
import * as brewer from 'chartjs-plugin-colorschemes/src/colorschemes/colorschemes.brewer';


const compare = (a, b) => {
  if (a.x < b.x) {
    return -1;
  }
  if (a.x > b.x) {
    return 1;
  }
  return 0;
};

const getRecommendations = async (searchText, username) => {
  const res = await axios({
    method: 'post',
    url: 'http://mnipdmveeravalli:3000/recommendations',
    headers: {},
    data: {
      query: searchText,
      user: username,
    }
  });
  const trimmedSearchText = searchText.trim();
  const newSearchText = trimmedSearchText.substring(0, trimmedSearchText.lastIndexOf(' '));
  const result = [];
  if (res && res.data) {
    const node = res.data.node && res.data.node.word;
    res.data.data && res.data.data.forEach(recommendation => {
      result.push({ value: `${newSearchText} ${node} ${recommendation.word}`.trim() });
    });
  }
  return result;
};

const getSearchData = async (searchText, username) => {
  try {
    const response = await axios({
      method: 'post',
      url: 'http://mnipdmveeravalli:3000/',
      headers: {},
      data: {
        query: searchText,
        user: username,
      },
    });
    const result = response.data;
    let data;
    if (result.type === 'pie' || result.type === 'donut') {
      const chartData = {
        labels: [],
        datasets: [
          {
            label: 'Co-pilot Chart',
            // Ref: https://nagix.github.io/chartjs-plugin-colorschemes/colorchart.html
            backgroundColor: office.BlueGreen6,
            data: []
          }
        ]
      };
      result.data.forEach(record => {
        chartData.labels.push(record.name);
        chartData.datasets[0].data.push(record.value);
      });
      data = {
        data: chartData,
        type: result.type,
      }
    } else if (result.type === 'bar') {
      const chartData = {
        labels: [],
        datasets: [
          {
            label: 'Quote Value',
            data: [],
            backgroundColor: brewer.RdPu3[0],
          }
        ],
      };
      result.data.forEach(record => {
        chartData.labels.push(record.xaxis);
        chartData.datasets[0].data.push(record.yaxis);
      });
      chartData.labels.sort();
      data = {
        data: chartData,
        type: result.type,
      }
    } else if (result.type === 'scatter') {
      const chartData = {
        datasets: [
          {
            label: 'Price',
            data: result.data.map(record => ({
              x: record.xaxis,
              y: record.yaxis,
            })),
            backgroundColor: 'rgba(255, 99, 132, 1)',
          },
        ],
      };
      chartData.datasets[0].data.sort(compare);
      data = {
        data: chartData,
        type: result.type,
      }
    } else {
      data = result;
    }
    return data;
  } catch (e) {
    return {
      error: e.response.data.message,
    };
  }
};

export {
  getRecommendations,
  getSearchData,
}