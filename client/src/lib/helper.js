export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const checkAndRemoveExpiredToken = () => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem('token');

  if (!token) {
    console.log('No token found in localStorage.');
    return;
  }
  console.log(token)
  // Decode the token payload
  const tokenParts = token.split('.');
  if (tokenParts.length !== 3) {
    console.error('Token format is invalid.');
    localStorage.removeItem('Token');
    return;
  }

  try {
    const payload = JSON.parse(atob(tokenParts[1]));
    console.log(payload)
    // Check if the token has an expiration time
    if (!payload.exp) {
      console.error('Token does not have an expiration time.');
      localStorage.removeItem('Token');
      return;
    }

    // Convert expiration time from seconds to milliseconds
    const expirationTime = payload.exp * 1000;
    const currentTime = Date.now();

    // Check if the token is expired
    if (currentTime > expirationTime) {
      console.log('Token is expired. Removing it from localStorage.');
      localStorage.removeItem('Token');
    } else {
      console.log('Token is still valid.');
    }
  } catch (e) {
    console.error('Error parsing token payload:', e);
    localStorage.removeItem('Token');
  }
}