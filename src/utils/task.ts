import { Project } from "types/Project";
import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { useDeleteConfig, useEditConfig } from "./use-optimistic-options";
export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  // 两秒之内多次发送会只发送一次
  return useQuery<Task[], Error>(["tasks", param], () => client("tasks", { data: param }));
};

export const useTask = (id?: number) => {
  const client = useHttp();
  // enabled只有当id有值才激活useQuery
  return useQuery<Project>(["task", { id }], () => client(`tasks/${id}`), { enabled: Boolean(id) });
};

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  // 函数成功后会触发onSuccess重新请求projects
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) => client(`tasks/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};
