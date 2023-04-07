import 'dotenv/config';

const apiURL = process.env.API_URL;

export default {
  expo: {
    extra: {
      apiUrl: apiURL,
    },
  }
}