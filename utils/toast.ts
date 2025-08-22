import toast from "react-hot-toast";

export const showSuccess = (msg: string) => {
  toast.success(msg, {
    style: {
      borderRadius: "8px",
      background: "#333",
      color: "#fff",
    },
  });
};

export const showError = (msg: string) => {
  toast.error(msg, {
    style: {
      borderRadius: "8px",
      background: "#fff",
      color: "#ff3333",
      fontWeight: "500",
    },
  });
};
