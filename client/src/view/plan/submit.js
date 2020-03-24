import axios from 'axios'


export const submitPlan = newIncident => {
  return axios
    .post('http://localhost:5000/api/incident/add', {
      name: newIncident.name,
      admin: newIncident.admin,
      responsibles: newIncident.responsibles,
      degree: newIncident.degree,
      probability:newIncident.probability,
    })
    .then(response => {
      console.log('add')
    })
}