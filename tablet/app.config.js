import 'dotenv/config';

const apiURL = process.env.API_URL;

export default {
  expo: {
    name: "tablet-expo-go",
    slug: "tablet-expo-go",
    version: "1.0.0",
    android: {
      package: "com.zeyd.dinnerchamptablet"
    },
    extra: {
      apiUrl: apiURL,
      eas: {
        projectId: 'fb2cf6b4-056f-41c5-9566-82451d69ab23',
      },
    },
  },
};
