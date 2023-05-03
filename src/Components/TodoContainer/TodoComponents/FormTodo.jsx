import Button from "antd/lib/button";
import Checkbox from "antd/lib/checkbox";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Modal from "antd/lib/modal";
import message from "antd/lib/message";
import "antd/lib/button/style";
import "antd/lib/checkbox/style";
import "antd/lib/form/style";
import "antd/lib/input/style";
import "antd/lib/modal/style";
import "antd/lib/message/style";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { post } from "../../fetch/axiosClient";
function FormTodo({ ModalValue, IsModalOpen, handelOpen, handelAdd, OpenAdd }) {
  const [form] = Form.useForm();
  const [isCheck, setIsCheck] = useState(false);

  const result = useMemo(() => {
    return isCheck ? "DONE" : "UNDONE";
  }, [isCheck]);

  useEffect(() => {
    setIsCheck(ModalValue?.status === "DONE" ? true : false);
  }, [IsModalOpen]);

  const handelCheckBox = useCallback((e) => {
    setIsCheck(e.target.checked);
  }, []);

  const handleCancel = () => {
    OpenAdd(handelAdd);
    form.resetFields();
    handelOpen(!IsModalOpen);
  };
  const handleOk = async () => {
    if (handelAdd == false) {
      try {
        const response = await post("/list/update", {
          id: ModalValue?._id,
          job: form.getFieldValue("job"),
          status: result,
          title: form.getFieldValue("title"),
          des: form.getFieldValue("description"),
        });
        message.success(response.data.message);
      } catch (error) {
        console.log(error);
        message.error("An error occured while updating the list item.");
      }
    } else {
      try {
        const response = await post("/list/add", {
          job: form.getFieldValue("job"),
          status: result,
          title: form.getFieldValue("title"),
          des: form.getFieldValue("description"),
        });
        message.success(response.data.message);
      } catch (error) {
        console.log(error);
        message.error("An error occured while adding the list item.");
      }
    }
    OpenAdd(handelAdd);
    handelOpen(!IsModalOpen);
  };
  const handleDel = async () => {
    await post("/list/delete", {
      id: ModalValue?._id,
    }).then((res) => {
      message.success(res.data.message);
    });
    OpenAdd(handelAdd);
    handelOpen(!IsModalOpen);
  };

  const initialValues = {
    title: ModalValue?.title,
    description: ModalValue?.description,
    job: ModalValue?.job,
    status: isCheck,
  };
  return (
    <>
      <Modal
        title="Todo Form"
        open={IsModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="delete" type="primary" danger onClick={handleDel}>
            Delete
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <div>
          {handelAdd == false ? (
            <Form form={form} initialValues={initialValues}>
              <Form.Item name="title" label="Title">
                <Input />
              </Form.Item>
              <Form.Item name="description" label="Description">
                <Input />
              </Form.Item>
              <Form.Item name="job" label="Todo">
                <Input />
              </Form.Item>
              <Form.Item name="status">
                <Checkbox checked={isCheck} onChange={handelCheckBox}>
                  Done
                </Checkbox>
              </Form.Item>
            </Form>
          ) : (
            <Form form={form}>
              <Form.Item name="title" label="Title">
                <Input />
              </Form.Item>
              <Form.Item name="description" label="Description">
                <Input />
              </Form.Item>
              <Form.Item name="job" label="Todo">
                <Input />
              </Form.Item>
              <Form.Item name="status">
                <Checkbox checked={isCheck} disabled onChange={handelCheckBox}>
                  Done
                </Checkbox>
              </Form.Item>
            </Form>
          )}
        </div>
      </Modal>
    </>
  );
}

export default FormTodo;
