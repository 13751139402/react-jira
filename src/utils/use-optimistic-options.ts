import { QueryKey, useQueryClient } from "react-query";

// 乐观更新,queryKey来定位缓存
const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any[]) => any[]) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey), // 成功时候使这个缓存失效，然后就会再次请求列表数据用作新缓存
    // useMutation执行后就执行这个函数，target是请求发送的data
    onMutate: (target: any) => {
      const previousItems = queryClient.getQueryData(queryKey); // 获取queryKey的缓存
      queryClient.setQueryData(queryKey, (old?: any[]) => callback(target, old)); // 进行乐观更新的操作
      return { previousItems }; // previousItems提供给onError
    },
    onError(error: any, newItem: any, context: any) {
      // 失败了则把缓存返回为previousItems值
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};
export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old: any) => old?.filter((item: any) => item.id !== target.id) || []);
export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old: any) =>
    old?.map((item: any) => (item.id === target.id ? { ...item, ...target } : item))
  );

// 乐观更新用于配制useMutation的第二个参数
// 将新增的内容添加到缓存列表中
export const useAddConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old: any) => [...old, target]);

export const useReorderConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => old || []);
