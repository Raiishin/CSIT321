// Config File

export default {
  backendEndpoint: 'http://localhost:5001', // Dev: http://localhost:5001
  encryption: {
    salt: 'DE2A8DAB8EDFB45866B745ABD786D360C67CAFFA20833B72D31ABDD7060C316E',
    iterations: 10000
  },
  sessionIdleTimeout: 3 * 60 * 1000 // 3 minutes
};
