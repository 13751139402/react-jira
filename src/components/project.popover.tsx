import React from "react";
import { Popover, Typography } from "antd";
import { useProjects } from "utils/project";
import { List, Divider } from "antd";
import styled from "@emotion/styled/macro";
import { ButtonNoPadding } from "./lib";
import { useProjectModal } from "screens/project-list/util";
export const ProjectPopover = () => {
  const { data: projects, refetch } = useProjects();
  const { open } = useProjectModal();
  const pinnedProjects = projects?.filter((project) => project.pin);
  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name}></List.Item.Meta>
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding onClick={open} type="link">
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );
  // 每次打开的时候都refetch刷新缓存
  return (
    <Popover onVisibleChange={() => refetch()} placement="bottom" content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
