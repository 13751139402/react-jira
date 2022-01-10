import { Kanban } from "types/kanban";
import { useHttp } from "utils/http";
import { useQuery } from "react-query";
export const useKanBans = (param?: Partial<Kanban>) => {
  const client = useHttp();
  return useQuery<Kanban[], Error>(["kanbans", param], () => client("kanbans", { data: param }));
};
