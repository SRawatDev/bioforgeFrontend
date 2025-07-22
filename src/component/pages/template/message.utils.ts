
import toast from 'react-hot-toast';

export const SuccessMessage = (message: string) => {
  toast.success(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#10b981',
      color: '#fff',
      borderRadius: '10px',
      padding: '16px',
      fontSize: '14px',
      fontWeight: '500',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#10b981',
    },
  });
};

export const ErrorMessage = (message: string) => {
  toast.error(message, {
    duration: 5000,
    position: 'top-right',
    style: {
      background: '#ef4444',
      color: '#fff',
      borderRadius: '10px',
      padding: '16px',
      fontSize: '14px',
      fontWeight: '500',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#ef4444',
    },
  });
};

export const InfoMessage = (message: string) => {
  toast(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#3b82f6',
      color: '#fff',
      borderRadius: '10px',
      padding: '16px',
      fontSize: '14px',
      fontWeight: '500',
    },
    icon: 'ℹ️',
  });
};

export const WarningMessage = (message: string) => {
  toast(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#f59e0b',
      color: '#fff',
      borderRadius: '10px',
      padding: '16px',
      fontSize: '14px',
      fontWeight: '500',
    },
    icon: '⚠️',
  });
};

export const LoadingMessage = (message: string) => {
  return toast.loading(message, {
    position: 'top-right',
    style: {
      background: '#6b7280',
      color: '#fff',
      borderRadius: '10px',
      padding: '16px',
      fontSize: '14px',
      fontWeight: '500',
    },
  });
};

export const DismissMessage = (toastId: string) => {
  toast.dismiss(toastId);
};

export const CustomMessage = (message: string, options: any = {}) => {
  toast(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#374151',
      color: '#fff',
      borderRadius: '10px',
      padding: '16px',
      fontSize: '14px',
      fontWeight: '500',
    },
    ...options,
  });
};
