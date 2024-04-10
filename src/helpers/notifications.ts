import { toast } from "react-toastify";
import {TypeOptions} from "react-toastify/dist/types";

export const showNotification = (message: string, type: TypeOptions, options?: {
    autoClose?: number | false;
}) => {
    toast.error(message, {
        position: "top-right",
        autoClose: options?.autoClose ?? false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        type,
    });
};

export const showNotificationError = (message: string) => {
    showNotification(message, 'error', {
        autoClose: 5000
    });
};

export const showNotificationSuccess = (message: string) => {
    showNotification(message, 'success', {
        autoClose: 5000
    });
};

export const showNotificationWarning = (message: string) => {
    showNotification(message, 'warning');
};

export const showNotificationInfo = (message: string) => {
    showNotification(message, 'info');
};


