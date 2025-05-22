import type { Dispatch, SetStateAction } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useRateLimit = (key: string, limitMs: number = 5_000) => {
  const [lastAction, setLastAction] = useLocalStorage<number | null>(key, null);

  const canExecute = () => {
    const now = Date.now();
    return !lastAction || now - (lastAction as number) >= limitMs;
    // return false;
  };

  const execute = (callback: () => void) => {
    if (canExecute()) {
      (setLastAction as Dispatch<SetStateAction<number | null>>)(Date.now());
      callback();
    }
  };

  return { canExecute, execute };
};
