import { useHttp } from "utils/http";
import { useQuery } from "react-query";
import { TaskType } from "types/task-type";
export const useTaskTypes = (param?: Partial<TaskType>) => {
  const client = useHttp();
  return useQuery<TaskType[], Error>(["taskTypes"], () => client("taskTypes"));
};
