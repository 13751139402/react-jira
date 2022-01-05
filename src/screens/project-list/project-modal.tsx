import React, { useEffect } from "react";
import { Drawer, Button, Spin, Form, Input } from "antd";
import { useProjectModal } from "./util";
import { UserSelect } from "components/user-select";
import { useEditProject, useAddProject } from "utils/project";
import { useForm } from "antd/es/form/Form";
import { ErrorBox } from "components/lib";
import styled from "@emotion/styled";
export const ProjectModal = () => {
  const { projectCreate, close, editingProject, isLoading } = useProjectModal();
  const [form] = useForm(); // form可以控制下面的Form
  const useMutateProject = editingProject ? useEditProject : useAddProject;
  // mutate和mutateAsync,async能控制请求完成再做 逻辑
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  const title = editingProject ? "编辑项目" : "创建项目";

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  return (
    <Drawer visible={projectCreate} width="100%" onClose={close}>
      <Container>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form form={form} layout="vertical" style={{ width: "40rem" }} onFinish={onFinish}>
              <Form.Item label="名称" name="name" rules={[{ required: true, message: "请输入项目名" }]}>
                {/* Form会给子元素加上value和onChange,所以这里不用传 */}
                <Input placeholder="请输入项目名称" />
              </Form.Item>
              <Form.Item label="部门" name="organization" rules={[{ required: true, message: "请输入部门名" }]}>
                <Input placeholder="请输入部门名" />
              </Form.Item>
              <Form.Item label="负责人" name="personId">
                <UserSelect defaultOptionName="负责人" />
              </Form.Item>
              <Form.Item>
                <Button loading={mutateLoading} type="primary" htmlType="submit">
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

const Container = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
