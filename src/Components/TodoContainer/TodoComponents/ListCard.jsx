import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useEffect, useState } from "react";
import FormTodo from "./FormTodo";
import TodoAction from "./TodoAction";

function ListCard({ todo }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalValue, setModalValue] = useState(null);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <FormTodo
        ModalValue={modalValue}
        IsModalOpen={isModalOpen}
        handelAdd={!modalValue}
        OpenAdd={toggleModal}
        handelOpen={toggleModal}
      />
      <TodoAction
        IsModalOpen={isModalOpen}
        handelOpen={toggleModal}
        OpenAdd={toggleModal}
        ResetData={() => setModalValue(null)}
      />
      <Card
        style={{ width: 300, marginTop: 16 }}
        onClick={() => {
          setModalValue(todo);
          setIsModalOpen(true);
        }}
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
