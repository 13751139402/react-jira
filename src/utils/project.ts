import { useAsync } from "utils/use-async";
import { Project } from "screens/project-list/list";
import { useHttp } from "utils/http";
import { useMutation, useQuery, useQueryClient } from "react-query";
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  // param变化时,useQuery自动触发
  return useQuery<Project[], Error>(["projects", param], () => client("projects", { data: param }));
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  // 函数成功后会触发onSuccess重新请求projects
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projectes/${params.id}`, {
        data: params,
        method: "POST",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  // enabled只有当id有值才激活useQuery
  return useQuery<Project>(["project", { id }], () => client(`projects/${id}`), { enabled: Boolean(id) });
};
