import { Project } from "types/Project";
import { useHttp } from "utils/http";
import { useQuery } from "react-query";
import { Task } from "types/task";
export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  // 两秒之内多次发送会只发送一次
  return useQuery<Task[], Error>(["tasks", param], () => client("tasks", { data: param }));
};
