import { Button, Checkbox, Form, Input, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import { post } from "../../fetch/axiosClient";
function FormTodo({ ModalValue, IsModalOpen, handelOpen, handelAdd, OpenAdd }) {
  const [form] = Form.useForm();
  const [isCheck, setIsCheck] = useState(false);

  let result;
  if (isCheck === true) {
    result = "DONE";
  } else if (isCheck === false) {
    result = "UNDONE";
  } else {
    result = "UNDONE";
  }

  useEffect(() => {
    if (ModalValue?.status === "DONE") {
      setIsCheck(true);
    } else if (ModalValue?.status === "UNDONE") {
      setIsCheck(false);
    } else {
      setIsCheck(false);
    }
  }, [IsModalOpen]);

  const handelCheckBox = (e) => {
    if (e.target.checked === true) {
      setIsCheck(true);
    } else if (e.target.checked === false) {
      setIsCheck(false);
    } else {
      setIsCheck(false);
    }
  };
  const handleCancel = () => {
    OpenAdd(handelAdd);
    form.resetFields();
    handelOpen(!IsModalOpen);
  };
  const handleOk = async () => {
    if (handelAdd == false) {
      await post("/list/update", {
        id: ModalValue?._id,
        job: form.getFieldValue("job"),
        status: result,
        title: form.getFieldValue("title"),
        des: form.getFieldValue("description"),
        //   skip: page,
      }).then((res) => {
        message.success(res.data.message);
      });
    } else {
      await post("/list/add", {
        job: form.getFieldValue("job"),
        status: result,
        title: form.getFieldValue("title"),
        des: form.getFieldValue("description"),
        //   skip: page,
      }).then((res) => {
        message.success(res.data.message);
      });
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
