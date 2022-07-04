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
  const response = await axios.post(baseUrl, newObject, config());
  return response.data;
};

const update = async (newObject) => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject);
  return response.data;
};

const remove = async (id) => {
  return await axios.delete(`${baseUrl}/${id}`, config());
};

export default { getAll, create, update, remove };