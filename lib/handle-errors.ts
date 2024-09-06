import toast from 'react-hot-toast';

export const handleErrors = (e: string) => {
  toast.error(e);
};
