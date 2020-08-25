import axios from 'axios';

const API_URL = `http://localhost:3005`;

export const getVideos = async () => {
  const response = await axios({
    method: 'GET',
    url: `${API_URL}/videos/`,
  });
  if (response.status === 200) {
    return response.data;
  } else return Promise.reject('An error has occured');
};

export const uploadVideos = (files) => {
  return Promise.all(
    Array.from(files).map((file) => {
      const formData = new FormData();
      formData.append('videos', file);
      return axios({
        method: 'POST',
        url: `${API_URL}/videos/upload`,
        data: formData,
      });
    })
  );
};

export const deleteVideo = (id) => {
  return axios({
    method: 'DELETE',
    url: `${API_URL}/videos/${id}`,
  });
};
