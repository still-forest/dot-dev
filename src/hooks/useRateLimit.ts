import { useState } from "react";

export const useRateLimit = (limitMs: number = 5_000) => {
  const [lastAction, setLastAction] = useState<number | null>(null);

  const canExecute = () => {
    const now = Date.now();
    return !lastAction || now - lastAction >= limitMs;
  };

  const execute = (callback: () => void) => {
    if (canExecute()) {
      setLastAction(Date.now());
      callback();
    }
  };

  return { canExecute, execute };
};
