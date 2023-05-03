import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";

function TodoAction({
  IsModalOpen,
  OpenAdd,
  handelOpen,
  handelAdd,
  ResetData,
}) {
  const handleAddClick = () => {
    handelOpen?.(IsModalOpen);
    OpenAdd(!handelAdd);
    ResetData();
  };

  return (
    <FloatButton
      tooltip={<p>Add button</p>}
      type="primary"
      icon={<PlusOutlined />}
      onClick={handleAddClick}
    />
  );
}

export default TodoAction;
