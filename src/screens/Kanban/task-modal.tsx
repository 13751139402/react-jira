import React, { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { useTasksModal, useTasksQueryKey } from "./util";
import { useEditTask } from "utils/task";
import { Form, Modal, Input } from "antd";
import { UserSelect } from "components/user-select";
import { TaskTypeSelect } from "components/task-type-select";
export const TaskModal = () => {
  const [form] = useForm();
  const { editingTaskId, editingTask, close } = useTasksModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(useTasksQueryKey());

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onCancel = () => {
    close();
    form.resetFields();
  };

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      onCancel={onCancel}
      onOk={onOk}
      forceRender={true}
      okText="确认"
      cancelText="取消"
      confirmLoading={editLoading}
      title="编辑任务"
      visible={!!editingTaskId}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item label="任务名" name="name" rules={[{ required: true, message: "请输入任务名" }]}>
          <Input></Input>
        </Form.Item>
        <Form.Item label="经办人" name="processorId">
          <UserSelect defaultOptionName="经办人" />
        </Form.Item>
        <Form.Item label="类型" name="typeId" rules={[{ required: true, message: "请输入任务名" }]}>
          <TaskTypeSelect />
        </Form.Item>
      </Form>
    </Modal>
  );
};
