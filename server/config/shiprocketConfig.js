require('dotenv').config();
const axios = require('axios');

async function authenticate() {
  try {
    const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD
    });

    const token = response.data.token;
    console.log('Authentication successful:', token);
    return token;
  } catch (error) {
    console.error('Authentication failed:', error.response.data);
  }
}
