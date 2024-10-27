import { useState, useEffect } from "react";

export const useErrorMessage = () => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timeoutId: number | undefined;
    if (error) {
      timeoutId = window.setTimeout(() => {
        setError(null);
      }, 30000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [error]);

  return [error, setError] as const;
};
