import Swal from "sweetalert2";

const createToast = (icon, title) =>
    Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon,
        title,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

export const ShowSwalToast = ({ icon = " info", title = "Success" }) => {
    createToast(icon, title).fire();
}

