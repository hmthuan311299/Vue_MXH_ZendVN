const axios = require('axios');


const axios_instance = axios.create({
    baseURL: 'http://api-meme-zendvn-01.herokuapp.com/api/',
    headers: { 'accept': 'application/json' }
});
export default axios_instance;