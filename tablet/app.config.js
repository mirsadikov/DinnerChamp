import 'dotenv/config';

const apiURL = process.env.API_URL;

export default {
  expo: {
    name: 'DinnerChamp Tablet',
    slug: 'dinnerchamp-tablet',
    orientation: 'landscape',
    icon: './assets/icon.png',
    version: '1.0.0',
    android: {
      package: 'com.zeyd.dinnerchamptablet',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
    },
    extra: {
      apiUrl: apiURL,
      eas: {
        projectId: '3ddd682b-80cc-4cbb-a441-fa5dc7810996',
      },
    },
  },
};
