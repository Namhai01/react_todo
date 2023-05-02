import React, { useEffect, useState } from "react";
import {
  Space,
  Card,
  Pagination,
  Form,
  Input,
  Checkbox,
  Divider,
  Popconfirm,
} from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FloatButton } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { post } from "../fetch/axiosClient";
import Meta from "antd/es/card/Meta";
import ModalTodo from "../Modal/Modal";
import Container from "../TodoContainer/Container";

function Home() {
  const [Todos, setTodos] = useState([]);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [Job, setJob] = useState("");
  const [Title, setTitle] = useState("");
  const [Id, setId] = useState("");
  const [Des, setDes] = useState("");
  const [Total, setTotal] = useState("");
  const [Q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [OnDelete, setOnDelete] = useState(false);
  const [details, setDetails] = useState();
  const [Status, setStatus] = useState(false);
  const HandelAddbtn = () => {
    setId("");
    setDes("");
    setTitle("");
    setJob("");
    setIsModalOpen(true);
    setOnDelete(false);
  };

  const HandelDeletebtn = () => {
    setOnDelete(true);
  };

  const pagination = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    post("/list/find", { job: Q, skip: page }).then((res) => {
      if (res.data) {
        setTotal(res?.data.Total);
        setTodos(res?.data.Findtodo);
      }
    });
  }, [Q, page]);

  const handelModal = (todo) => {
    if (todo.status === "UDONE") {
      setStatus(false);
    } else if (todo.status === "DONE") {
      setStatus(true);
    } else {
      setStatus(false);
    }
    setDetails(todo);
    setIsModalOpen(true);
  };
  return (
    <>
      {/* Toast Message */}
      <ToastContainer />
      {/* Toast Message */}
      <Container />
      {/* Search Bar */}
      <Form>
        <Form.Item wrapperCol={{ offset: 5, span: 13 }}>
          <Input onChange={(e) => setQ(e.target.value)} />
        </Form.Item>
      </Form>
      {/* Search Bar */}
      {/* TodoList */}
      <Space size={[20, 16]} wrap>
        {Todos?.map((todo) => (
          <Card
            style={{ width: 300, marginTop: 16 }}
            key={todo._id}
            onClick={() => handelModal(todo)}
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
      {/* TodoList */}
      <FloatButton.Group shape="circle" style={{ right: 24 }}>
        <FloatButton icon={<QuestionCircleOutlined />} />
        <FloatButton />
        <FloatButton icon={<SyncOutlined />} />
        <FloatButton.BackTop visibilityHeight={0} />
      </FloatButton.Group>

      <ModalTodo
        IsModalOpen={IsModalOpen}
        handelOpen={() => setIsModalOpen(!IsModalOpen)}
        details={details}
        statuss={Status}
        OnDelete={OnDelete}
      />
      <Pagination current={page} total={Total} onChange={pagination} />
    </>
  );
}

export default Home;
