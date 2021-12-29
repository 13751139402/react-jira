import { useCallback, useState } from "react";

export const useUndo = <T>(initialPresent: T) => {
  // 三个互相关联的state结合在一起
  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initialPresent,
    future: [],
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  // 取一个过去的值
  const undo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (past.length === 0) return currentState;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1); // 复制0至past.length-1的数组给newPast

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    });
  }, []); // 这里不需要任何依赖，因为所有state都是通过setState获取的

  // 取一个前面的值
  const redo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (future.length === 0) return currentState;

      const next = future[0];
      const newFuture = future.slice(1); // 舍弃第一个

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const set = useCallback((newPresent: T) => {
    setState((currentState) => {
      const { past, present } = currentState;
      if (newPresent === present) {
        return currentState;
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  const reset = useCallback((newPresent: T) => {
    setState(() => {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  // 在自定义hook里return函数最好加上useCallback
  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const;
};
