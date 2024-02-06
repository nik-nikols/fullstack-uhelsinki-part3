import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    return axios
      .get(baseUrl)
      .then(response => response.data)
}

const create = (personObject) => {
    return axios
      .post(baseUrl, personObject)
      .then(response => response.data)
}

const update = (personObject) => {
    return axios
      .put(`${baseUrl}/${personObject.id}`, personObject)
      .then(response => response.data)
}

const deletePerson = (id) => {
    return axios
      .delete(`${baseUrl}/${id}`)
      .then(response => 'deleted')
}

export default { getAll, create, update, deletePerson }