import { store } from "react-notifications-component";

export enum NotificationType {
  Success = "success",
  Danger = "danger",
  Info = "info",
  Default = "default",
  Warning = "warning"
}

const useNotification = () => {
  const notify = (
    title: string,
    message: string,
    type: NotificationType,
    duration: number = 3000
  ) => {
    store.addNotification({
      title,
      message,
      type,
      container: "bottom-left",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration,
      },
    });
  };

  return { notify };
};

export default useNotification;
