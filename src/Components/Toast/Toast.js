import { toast } from "react-toastify";

function Toast(type, message) {
  const options = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  if (type === "success") {
    toast.success(`Crib ${message} Successfully`, options);
  } else if (type === "delete") {
    toast.success(`Crib ${message} Successfully`, options);
  } else {
    toast.error("Something Went Wrong", options);
  }
}

export default Toast;
