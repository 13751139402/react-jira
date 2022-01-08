import { useEffect } from "react";
import { cleanObject } from "utils";
import { useAsync } from "./use-async";
import { useHttp } from "utils/http";
import { User } from "types/User";

export const useUsers = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();
  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
