import { useState } from "react";

export const useUndo = <T>(initialPresent: T) => {
  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState(initialPresent);
  const [future, setFuture] = useState<T[]>([]);

  const canUndo = past.length !== 0;
  const canRedo = future.length !== 0;

  // 取一个过去的值
  const undo = () => {
    if (!canUndo) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1); // 复制0至past.length-1的数组给newPast

    setPast(newPast);
    setPresent(previous);
    setFuture([present, ...future]);
  };
};
