import axios from 'axios';

const getRecommendations = async (searchText) => {
  const res = await axios({
    method: 'post',
    url: 'http://mnipdmveeravalli:3000/recommendations',
    headers: {},
    data: {
      query: searchText,
      user: 'demo',
    }
  });
  console.log('response:: ', res);
  const trimmedSearchText = searchText.trim();
  const newSearchText = trimmedSearchText.substring(0, trimmedSearchText.lastIndexOf(' '));
  console.log('newSearchText:: ', newSearchText);
  const result = [];
  if (res && res.data) {
    const node = res.data.node && res.data.node.word;
    res.data.data && res.data.data.forEach(recommendation => {
      result.push({ value: `${newSearchText} ${node} ${recommendation.word}`.trim() });
    });
  }
  return result;
};

const getSearchData = async (searchText) => {
  console.log('searchText:: ', searchText);
  const res = await axios({
    method: 'post',
    url: 'http://mnipdmveeravalli:3000/',
    headers: {},
    data: {
      query: searchText,
      user: 'demo',
    }
  });
  console.log('response:: ', res);
  return res.data;
};

export {
  getRecommendations,
  getSearchData,
}