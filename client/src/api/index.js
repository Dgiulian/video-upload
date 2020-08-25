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

export const uploadFiles = async (files) => {
  const formData = new FormData();
  for (let file of files) {
    formData.append('videos', file);
    console.log(file);
  }

  const response = await axios({
    method: 'POST',
    url: `${API_URL}/videos/upload`,
    data: formData,
    /*  headers: {
      'Content-Type': 'multipart/form-data',
    }, */
  });

  console.log(response);
};

export const deleteVideo = (id) => {
  return axios({
    method: 'DELETE',
    url: `${API_URL}/videos/${id}`,
  });
};
