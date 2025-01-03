// src/utils/notification.js
import { toast } from 'react-toastify';

export const notify = (message, options = {}) => {
    toast(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        ...options
    });
};