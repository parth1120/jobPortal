import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://jobs-api.squareboat.info/api/v1/'
})

let token = JSON.parse(localStorage.getItem('token'))
if(token) instance.defaults.headers.common['Authorization'] = token.token;


export default instance;