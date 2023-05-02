import { Space } from "antd";
import React, { useEffect } from "react";
import ListCard from "./ListCard";

function TodoList({ Todos }) {
  return (
    <Space size={[20, 16]} wrap>
      {Todos?.map((todo) => (
        <ListCard todo={todo} key={todo._id} />
      ))}
    </Space>
  );
}

export default TodoList;
