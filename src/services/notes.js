// notes route/api
// all functions/features related to notes object
//  Makes HTTP requests TO the backend

import axios from 'axios'

// gets notes data from 3001
// /api/notes if full
// /notes if frontend on its own
const baseUrl = '/api/notes'

let token = null


const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken}