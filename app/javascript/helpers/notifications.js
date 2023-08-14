import { toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaults = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  transition: Flip,
};

export const error = (message, options = {}) => {
  toast.error(message, Object.assign(defaults, options));
};
