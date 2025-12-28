// notes route/api
// all functions/features related to notes object

import axios from 'axios'

// gets notes data from 3001
const baseUrl = '/api/notes'

// const getAll = () => {
//   const request = axios.get(baseUrl)
//   return request.then(response => response.data)
// }

const getAll = () => {
  const request = axios.get(baseUrl)
//   const nonExisting = {
//     id: 10000,
//     content: 'This note is not saved to server',
//     important: true,
//   }
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update}