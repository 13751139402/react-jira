import { useAsync } from "utils/use-async";
import { Project } from "screens/project-list/list";
import { useHttp } from "utils/http";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useProjectsSearchParams } from "screens/project-list/util";
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  // param变化时,useQuery自动触发
  return useQuery<Project[], Error>(["projects", param], () => client("projects", { data: param }));
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  const [searchParams] = useProjectsSearchParams();
  const queryKey = ["projects", searchParams];
  // 函数成功后会触发onSuccess重新请求projects
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
      // 当useMutation一发生onMutate立即被调用
      async onMutate(target) {
        const previousItems = queryClient.getQueryData(queryKey);
        console.log("previousItems", previousItems);

        // old代表存在的数据
        // 乐观更新
        queryClient.setQueriesData(queryKey, (old?: Project[]) => {
          return old?.map((project) => (project.id === target.id ? { ...project, ...target } : project)) || [];
        });
        return { previousItems }; //返回previousItems数据用于onError回滚
      },
      // 当请求失败时会触发Error,context就是onMutate返回的数据
      onError(error, newItem, context: any) {
        queryClient.setQueriesData(queryKey, context?.previousItems);
      },
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
      async onMutate(target: Partial<Project>) {},
    }
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  // enabled只有当id有值才激活useQuery
  return useQuery<Project>(["project", { id }], () => client(`projects/${id}`), { enabled: Boolean(id) });
};
