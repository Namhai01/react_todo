import React, { createRef, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { post } from "../fetch/axiosClient";
import { Space, Modal, Form, Input, Checkbox, Button } from "antd";
function ModalTodo({ IsModalOpen, handelOpen, details, statuss, OnDelete }) {
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const [Id, setId] = useState("");
  const [Status, setStatus] = useState(false);
  const btn = createRef();
  const handelCheckBox = (e) => {
    if (e.target.checked == false) {
      setStatus(false);
    } else if (e.target.checked == true) {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };
  useEffect(() => {
    setId(details?._id);
    form.setFieldsValue({
      title: details?.title,
      job: details?.job,
      description: details?.description,
      status: statuss,
    });
  }, [IsModalOpen]);
  const onFinish = async (details) => {
    if (Id) {
      let result;
      if (statuss === true) {
        result = "DONE";
      } else if (statuss === false) {
        result = "UNDONE";
      } else {
        result = "UNDONE";
      }
      await post("/list/update", {
        id: Id,
        job: details?.job,
        status: result,
        title: details?.title,
        des: details?.description,
        skip: page,
      }).then((res) => {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    } else {
      await post("/list/add", {
        job: details?.job,
        title: details?.title,
        des: details?.description,
        skip: page,
      }).then((res) => {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    }
    if (OnDelete == true) {
      await post("/list/delete", {
        id: Id,
      }).then((res) => {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        // setUpdateTodos(res.data.getList);
      });
      setPage(1);
    }
    handelOpen(!IsModalOpen);
  };
  const handleCancel = () => {
    handelOpen(!IsModalOpen);
  };
  const Footer = (
    <>
      <Button type="secondary" onClick={handleCancel}>
        cancel
      </Button>
      <Button type="primary" onClick={() => btn.current.click()}>
        Add
      </Button>
    </>
  );
  const handleOk = async () => {};
  return (
    <>
      <ToastContainer />
      <Modal
        title="Edit todo"
        open={IsModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={Footer}
      >
        {OnDelete == true ? (
          <p>Bạn có chắc chắn muốn xoá ?</p>
        ) : (
          <div>
            <Form
              form={form}
              onFinish={onFinish}
              initialValues={{
                title: details?.title,
                description: details?.description,
                job: details?.job,
                status: details?.status,
              }}
            >
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
                <Checkbox onChange={handelCheckBox} checked={statuss}>
                  Done
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button
                    style={{ display: "none" }}
                    type="primary"
                    htmlType="submit"
                    ref={btn}
                  >
                    Submit
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </>
  );
}

export default ModalTodo;
