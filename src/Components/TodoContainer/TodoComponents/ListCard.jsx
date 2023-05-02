import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useEffect, useState } from "react";
import FormTodo from "./FormTodo";
import BtnHandel from "./BtnHandel";

function ListCard({ todo }) {
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState();
  const [handelAdd, setHandelAdd] = useState(false);
  const [IsAdd, setIsAdd] = useState(false);
  const handelModal = (todo) => {
    setData(todo);
    setIsModalOpen(true);
    setHandelAdd(true);
  };
  return (
    <>
      <FormTodo
        ModalValue={data}
        IsModalOpen={IsModalOpen}
        handelAdd={IsAdd}
        OpenAdd={() => setIsAdd(!handelAdd)}
        handelOpen={() => setIsModalOpen(!IsModalOpen)}
      />
      <BtnHandel
        IsModalOpen={IsModalOpen}
        handelAdd={handelAdd}
        handelOpen={() => setIsModalOpen(!IsModalOpen)}
        OpenAdd={() => setIsAdd(!handelAdd)}
        ResetData={() => setData()}
      />
      <Card
        style={{ width: 300, marginTop: 16 }}
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
    </>
  );
}

export default ListCard;
