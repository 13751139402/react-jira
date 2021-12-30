import { useCallback, useReducer, useState } from "react";

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

type State<T> = {
  past: T[];
  present: T;
  future: T[];
};

type Action<T> = { newPresent?: T; type: typeof UNDO | typeof REDO | typeof SET | typeof RESET };

// 状态管理器，当传入的type不同,数据改变的逻辑也不同，状态变成什么样子只要看return值即可，一目了然
// 像生产线一样，传入type改变state,由dispatch触发
const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state;
  const { type, newPresent } = action;

  switch (type) {
    case UNDO: {
      if (past.length === 0) return state;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1); // 复制0至past.length-1的数组给newPast

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }

    case REDO: {
      if (future.length === 0) return state;

      const next = future[0];
      const newFuture = future.slice(1); // 舍弃第一个

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }

    case SET: {
      if (newPresent === present) {
        return state;
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }

    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    }
  }
};

export const useUndo = <T>(initialPresent: T) => {
  // 运行起来时,useReducer会把当前的state传递给undoReducer
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as State<T>);

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  // 取一个过去的值
  const undo = useCallback(() => dispatch({ type: UNDO }), []); // 这里不需要任何依赖，因为所有state都是通过setState获取的

  // 取一个前面的值
  const redo = useCallback(() => dispatch({ type: REDO }), []);

  const set = useCallback((newPresent: T) => dispatch({ type: SET, newPresent }), []);

  const reset = useCallback((newPresent: T) => dispatch({ type: RESET, newPresent }), []);

  // 在自定义hook里return函数最好加上useCallback
  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const;
};
