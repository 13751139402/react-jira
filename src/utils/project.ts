import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-options";
import { Project } from "types/Project";
import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery } from "react-query";
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  // param变化时,useQuery自动触发
  return useQuery<Project[], Error>(["projects", param], () => client("projects", { data: param }));
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  // 函数成功后会触发onSuccess重新请求projects
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(({ id }: { id: number }) => client(`projects/${id}`, { method: "DELETE" }), useDeleteConfig(queryKey));
};

export const useProject = (id?: number) => {
  const client = useHttp();
  // enabled只有当id有值才激活useQuery
  return useQuery<Project>(["project", { id }], () => client(`projects/${id}`), { enabled: Boolean(id) });
};
