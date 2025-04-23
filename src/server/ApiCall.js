import axios from 'axios';

const apiCall = async ({ url, method, data = null, headers = {}, onSuccess, onError }) => {
  try {
    const response = await axios({
      method: method,    // e.g., GET, POST
      url: url,          // The API URL
      data: data,        // The data for POST or PUT requests
      headers: headers,  // The custom headers, e.g., Authorization token
    });

    // On success, call the onSuccess callback with the response data
    if (onSuccess) {
      onSuccess(response.data);
    }
  } catch (error) {
    // On error, call the onError callback with the error response or message
    if (onError) {
      onError(error.response?.data || error.message);
    }
  }
};

export default apiCall;
