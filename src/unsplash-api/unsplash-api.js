import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/search/photos';
axios.defaults.headers.common['Authorization'] =
  'Client-ID Dp58Xa1UComz2dxLn_cy8oZ__FmRAVQuQh9y8RX1usI';
axios.defaults.headers.common['Accept-Version'] = 'v1';
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getPhotos = async (query, page) => {
  const { data } = await axios.get(`?query=${query}&page=${page}`);
  return data;
};