import { Project } from "types/Project";
import { useHttp } from "utils/http";
import { useQuery } from "react-query";
import { Kanban } from "types/kanban";
export const useKanBan = (param?: Partial<Project>) => {
  const client = useHttp();
  return useQuery<Kanban[], Error>(["kanbans", param], () => client("kanbans", { data: param }));
};
