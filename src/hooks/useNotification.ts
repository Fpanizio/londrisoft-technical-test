import { useState } from "react";

export const useNotification = () => {
  const [showNotification, setShowNotification] = useState(false);

  const triggerNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return { showNotification, triggerNotification };
};