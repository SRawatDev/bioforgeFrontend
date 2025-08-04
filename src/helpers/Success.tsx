import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const SuccessMessage = (message: string) => {
  setTimeout(
    () =>
      toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }),
    10
  );
};
export default SuccessMessage