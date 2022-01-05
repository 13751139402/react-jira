import { useMemo } from "react";
import { useUrlQueryParam } from "utils/url";
import { useProject } from "utils/project";

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]), setParam] as const;
};

// 三种解决方案:1.redux 2.context 3.单独文件useState
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(["projectCreate"]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(["editingProjectId"]);
  const { data: editingProject, isLoading } = useProject(Number(editingProjectId));
  console.log("editingProject", editingProject);

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => {
    setProjectCreate({ projectCreate: undefined });
    setEditingProjectId({ editingProjectId: undefined });
  };
  const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id });
  return {
    projectCreate: projectCreate === "true" || Boolean(editingProject),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
