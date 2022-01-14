import { useEffect } from "react";
import { cleanObject } from "utils";
import { useAsync } from "./use-async";
import { useHttp } from "utils/http";
import { User } from "types/User";
import { useQuery } from "react-query";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  // enabled只有当id有值才激活useQuery
  return useQuery<User[]>(["users", param], () => client(`users`, { data: param }));
};
