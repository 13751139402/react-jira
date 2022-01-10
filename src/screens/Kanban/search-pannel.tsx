import { Row } from "components/lib";
import { UserSelect } from "components/user-select";
import { TaskTypeSelect } from "components/task-type-select";
import React from "react";
import { useSetUrlSearchParam } from "utils/url";
import { useTasksSearchParams } from "./util";
import { Button, Input } from "antd";

export const SearchPannel = () => {
  const searchParams = useTasksSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };

  return (
    <Row marginBottom={10} gap={true}>
      <Input style={{ width: "20rem" }} placeholder={"任务名"} value={searchParams.name} onChange={(evt) => setSearchParams({ name: evt.target.value })}></Input>
      <UserSelect defaultOptionName="经办人" value={searchParams.processorId} onChange={(value) => setSearchParams({ processorId: value })}></UserSelect>
      <TaskTypeSelect defaultOptionName="类型" value={searchParams.typeId} onChange={(value) => setSearchParams({ typeId: value })}></TaskTypeSelect>
      <Button onClick={reset}>清除筛选器</Button>
    </Row>
  );
};
