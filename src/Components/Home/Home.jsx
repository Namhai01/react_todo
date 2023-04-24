import React, { useEffect, useState } from "react";
import { Space, Card, Pagination, Modal, Form, Input, Checkbox } from "antd";
import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import Meta from "antd/es/card/Meta";

function Home() {
  const [Todos, setTodos] = useState([]);
  const [Job, setJob] = useState("");
  const [Title, setTitle] = useState("");
  const [Id, setId] = useState("");
  const [Des, setDes] = useState("");
  const [Total, setTotal] = useState("");
  const [Status, setStatus] = useState(false);
  const [Current, setCurrent] = useState();
  const [Q, setQ] = useState("");
  const [IsModalOpen, setIsModalOpen] = useState(false);

  const handelCheckBox = (e) => {
    if (e.target.checked == false) {
      setStatus(false);
    } else if (e.target.checked == true) {
      setStatus(true);
    }
  };

  const pagination = (pageNumber) => {
    setCurrent(pageNumber);
  };

  useEffect(() => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        job: Q,
        skip: Number(Current),
      },
      withCredentials: true,
      url: "http://localhost:3001/api/list/find",
    })
      .then((res) => {
        setTotal(res.data.data.Total);
        setTodos(res.data.data.Findtodo);
      })
      .catch((error) => console.log(error));
    () => setTodos([]);
  }, [Q, Current]);

  useEffect(() => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        skip: Number(Current),
      },
      withCredentials: true,
      url: "http://localhost:3001/api/list",
    })
      .then((res) => {
        if (res.data.data.getList && res.data.data.Total) {
          setTodos(res.data.data.getList);
          setTotal(res.data.data.Total);
        }
      })
      .catch((error) => console.log(error));
    () => setTodos([]);
  }, [Current]);

  const handleOk = () => {
    let result;
    if (Status === true) {
      result = "DONE";
    } else if (Status === false) {
      result = "UNDONE";
    } else {
      result = "UNDONE";
    }
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        id: Id,
        job: Job,
        status: result,
        title: Title,
        des: Des,
      },
      withCredentials: true,
      url: "http://localhost:3001/api/list/update",
    })
      .then((res) => alert(res.data.message))
      .then(() => {
        axios({
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            job: Q,
            skip: Number(Current),
          },
          withCredentials: true,
          url: "http://localhost:3001/api/list/find",
        })
          .then((res) => {
            setTotal(res.data.data.Total);
            setTodos(res.data.data.Findtodo);
          })
          .catch((error) => console.log(error));
      });

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handelModal = (_id, _title, _job, _des, _status) => {
    if (_status === "UDONE") {
      setStatus(false);
    } else if (_status === "DONE") {
      setStatus(true);
    } else {
      setStatus(false);
    }
    console.log(_id);
    setId(_id);
    setTitle(_title);
    setJob(_job);
    setDes(_des);
    setIsModalOpen(true);
  };
  return (
    <>
      <Form>
        <Form.Item wrapperCol={{ offset: 5, span: 13 }}>
          <Input onChange={(e) => setQ(e.target.value)} />
        </Form.Item>
      </Form>
      <Space size={[20, 16]} wrap>
        {Todos?.map((todo) => (
          <Card
            style={{ width: 300, marginTop: 16 }}
            key={todo._id}
            onClick={() =>
              handelModal(
                todo._id,
                todo.title,
                todo.job,
                todo.description,
                todo.status
              )
            }
            hoverable={true}
          >
            <Meta title={todo.title} description={todo.description} />
            {todo.status === "DONE" ? (
              <p style={{ textDecoration: "line-through" }}>{todo.job}</p>
            ) : (
              <p>{todo.job}</p>
            )}
          </Card>
        ))}
      </Space>
      <FloatButton
        shape="circle"
        type="primary"
        style={{
          right: 94,
        }}
        icon={<PlusOutlined />}
      />
      <Modal
        title="Edit todo"
        open={IsModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Title">
            <Input value={Title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Item>
          <Form.Item label="Description">
            <Input value={Des} onChange={(e) => setDes(e.target.value)} />
          </Form.Item>
          <Form.Item label="Todo">
            <Input value={Job} onChange={(e) => setJob(e.target.value)} />
          </Form.Item>
        </Form>
        <Checkbox onChange={handelCheckBox} checked={Status}>
          Done
        </Checkbox>
      </Modal>
      {<Pagination defaultCurrent={1} total={Total} onChange={pagination} />}
    </>
  );
}

export default Home;
