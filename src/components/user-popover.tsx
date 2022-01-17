import React from "react";
import { Popover, Typography } from "antd";
import { List } from "antd";
import styled from "@emotion/styled/macro";
import { useUsers } from "utils/user";
export const UserPopover = () => {
  const { data: users, refetch } = useUsers();
  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">组员列表</Typography.Text>
      <List>
        {users?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name}></List.Item.Meta>
          </List.Item>
        ))}
      </List>
    </ContentContainer>
  );
  // 每次打开的时候都refetch刷新缓存
  return (
    <Popover onVisibleChange={() => refetch()} placement="bottom" content={content}>
      <span>组员</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
