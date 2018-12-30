import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-my-burger-49afe.firebaseio.com/'
});

export default instance;