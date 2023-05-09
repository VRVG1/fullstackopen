import axios from "axios"
const baseUrl = "http://localhost:3001/persons"
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson)
  return request.then((response) => response.data)
}

const update = (id, newPerson) => {
  axios.put(`${baseUrl}/${id}`, newPerson).then((response) => {
    return response.data
  })
}

const remove = (id) => {
  axios.delete(`${baseUrl}/${id}`).then((response) => {
    return response
  })
}

export default { getAll, update, remove, create }
