import { useState, useEffect } from "react";

export const useCurrentTime = (updateInterval = 5) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000 * updateInterval);

    return () => clearInterval(timer);
  }, []);

  return currentTime;
};
