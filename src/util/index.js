import axios from 'axios';

const getRecommendations = async (searchText) => {
  const res = await axios({
    method: 'post',
    url: 'http://mnipdmveeravalli:3000/recommendations',
    headers: {},
    data: {
      query: searchText
    }
  });
  console.log('response:: ', res);
  const result = [];
  // const node = res && res.data && res.data.node && res.data.node.word;
  res && res.data && res.data.data && res.data.data.forEach(recommendation => {
    result.push({ value: recommendation.word });
  });
  return result;
};

const getSearchData = async (searchText) => {
  console.log('searchText:: ', searchText);
  const res = await axios({
    method: 'post',
    url: 'http://mnipdmveeravalli:3000/',
    headers: {},
    data: {
      query: searchText
    }
  });
  console.log('response:: ', res);
  return res.data;
};

export {
  getRecommendations,
  getSearchData,
}