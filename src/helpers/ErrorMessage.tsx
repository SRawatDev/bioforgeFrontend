import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const ErrorMessage = (message:string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    theme: "colored",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
export default ErrorMessage