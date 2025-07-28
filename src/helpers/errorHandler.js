import { toast } from 'react-toastify';

const errorHandler = (error, url = '/signin') => {
  if (!error) return null;

  const errorMessage = error?.response?.data?.message || error?.message || 'Something went wrong!';

  // Handle Unauthorized (401) errors with redirection
  if (error?.response?.status === 401) {
    toast.error(errorMessage, { toastId: 'auth-error' });
    setTimeout(() => {
      window.location.href = url;
    }, 3000);
  } else {
    toast.error(errorMessage, { toastId: 'error' });
  }
  // console.error('API Error:', errorMessage); // Log for debugging
};

export default errorHandler;
