import { Empty, FloatButton, Form, Input, Pagination } from "antd";
// import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { get, postWithQuery } from "../fetch/axiosClient";
import TodoList from "./TodoComponents/TodoList";
import BtnHandel from "./TodoComponents/BtnHandel";
function Container() {
  const [Q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [Total, setTotal] = useState();
  const [Todos, setTodos] = useState([]);
  const btn1 = useRef(null);
  useEffect(() => {
    if (Q) {
      postWithQuery("list/find", { job: Q }, { skip: page }).then((res) => {
        if (res.data) {
          if (res.data.Total < 10) {
            setPage(1);
          }
          setTotal(res.data.Total);
          setTodos(res.data.Findtodo);
        }
      });
    } else {
      get("/list", { skip: page }).then((res) => {
        if (res.data) {
          setTotal(res.data.Total);
          setTodos(res.data.getList);
        }
      });
    }
  }, [page, Q]);

  return (
    <>
      <div className="header">
        <Form>
          <Form.Item wrapperCol={{ offset: 5, span: 13 }}>
            <Input onChange={(e) => setQ(e.target.value)} />
          </Form.Item>
        </Form>
      </div>
      <div className="container">
        {Todos == [] ? <Empty /> : <TodoList Todos={Todos} />}

        {/* <BtnHandel /> */}
      </div>
      <div className="footer">
        <Pagination
          current={page}
          total={Total}
          onChange={(pageNumber) => {
            setPage(pageNumber);
          }}
        />
      </div>
    </>
  );
}

export default Container;
