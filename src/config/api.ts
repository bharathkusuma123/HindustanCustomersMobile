// For development with local backend
// Use your computer's IP address for mobile devices to connect
// export const API_BASE_URL = "http://YOUR_COMPUTER_IP:5000/api";
// export const SERVER_BASE_URL = "http://YOUR_COMPUTER_IP:5000";

// For production
// export const API_BASE_URL = "https://hindustanproteins.com:3000/api";
// export const SERVER_BASE_URL = "https://hindustanproteins.com:3000";

// Important: For mobile emulators:
// - iOS Simulator: localhost works
// - Android Emulator: use 10.0.2.2 for localhost
// - Real device: use your computer's IP address


//Bharath IP address for testing:
// export const API_BASE_URL = "http://192.168.1.2:5000/api";
// export const SERVER_BASE_URL = "http://192.168.1.2:5000";

//Mani IP address for testing:
export const API_BASE_URL = "http://192.168.1.10:5000/api";
export const SERVER_BASE_URL = "http://192.168.1.10:5000";



// In your config file where you have these exports
// import { Platform } from 'react-native';

// const getBaseUrl = () => {
//   if (__DEV__) {
//     // Development environment
//     if (Platform.OS === 'android') {
//       return 'http://10.0.2.2:5000'; // Android emulator
//     } else if (Platform.OS === 'ios') {
//       return 'http://localhost:5000'; // iOS simulator
//     } else {
//       return 'http://localhost:5000'; // Web or other
//     }
//   } else {
//     // Production environment
//     return 'https://your-production-domain.com';
//   }
// };

// const BASE_URL = getBaseUrl();
// export const API_BASE_URL = `${BASE_URL}/api`;
// export const SERVER_BASE_URL = BASE_URL;



// export const API_BASE_URL = "http://192.168.1.2/api";
// export const SERVER_BASE_URL = "http://10.0.2.2:5000";