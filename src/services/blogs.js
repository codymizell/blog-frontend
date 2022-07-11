import axios from 'axios';
import userService from './user';

const baseUrl = '/api/blogs';

const config = () => {
  return {
    headers: {
      Authorization: `bearer ${userService.getToken()}`
    },
  };
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async newObject => {
  try {
    const response = await axios.post(baseUrl, newObject, config());
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data.error;
  }
};

const update = async (newObject) => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject);
  return response.data;
};

const remove = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config());
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data.error;
  }
};

const createComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment);
  return response.data;
};

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export default { getAll, create, update, remove, createComment, getOne };