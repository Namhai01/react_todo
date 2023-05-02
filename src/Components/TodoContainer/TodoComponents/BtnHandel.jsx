import { Button, FloatButton, Form, Modal } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";

function BtnHandel({ IsModalOpen, OpenAdd, handelOpen, handelAdd, ResetData }) {
  const HandelClickAdd = () => {
    handelOpen(IsModalOpen);
    OpenAdd(!handelAdd);
    ResetData();
  };

  return (
    <>
      <FloatButton
        tooltip={<p>Add button</p>}
        type="primary"
        icon={<PlusOutlined />}
        onClick={HandelClickAdd}
      />
    </>
  );
}

export default BtnHandel;
