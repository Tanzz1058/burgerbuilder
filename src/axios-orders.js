import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-24867.firebaseio.com/'
})

export default instance;
