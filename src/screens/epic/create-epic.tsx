import React, { useEffect } from "react";
import { Drawer } from "antd";
import { DrawerProps } from "antd/es/drawer";
import styled from "@emotion/styled";
import { useAddEpics } from "utils/epic";
import { useEpicsQueryKey } from "./util";
import { useForm } from "antd/es/form/Form";
import { ErrorBox } from "components/lib";
import { Form, Spin, Input, Button } from "antd";
import { Container } from "screens/Kanban/kanban-column";
import { UserSelect } from "components/user-select";
import { useProjectIdInUrl } from "screens/Kanban/util";
export const CreateEpic = (props: Pick<DrawerProps, "visible"> & { onClose: () => void }) => {
  const { mutate: addEpic, isLoading, error } = useAddEpics(useEpicsQueryKey());
  const [form] = useForm();
  const projectId = useProjectIdInUrl();
  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId });
    props.onClose();
  };

  useEffect(() => {
    form.resetFields();
  }, [form, props.visible]);

  return (
    <Drawer visible={props.visible} onClose={props.onClose} forceRender={true} destroyOnClose={true} width="100%">
      <Container>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <h1>创建任务组</h1>
            <ErrorBox error={error} />
            <Form form={form} layout="vertical" style={{ width: "40rem" }} onFinish={onFinish}>
              <Form.Item label="名称" name="name" rules={[{ required: true, message: "请输入项目名" }]}>
                <Input placeholder="请输入项目名称" />
              </Form.Item>
              <Form.Item>
                <Button loading={isLoading} type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};
