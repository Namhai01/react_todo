import React, { useEffect, useState } from "react";
import { Input, Form, Checkbox, Button } from "antd";
import { Navigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handelSubmit = () => {
    axios({
      method: "post",
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
      url: "http://localhost:3001/api/auth/login",
    })
      .then((response) => setLogin(response.data.isLoggedIn))
      .catch((error) => alert(error));
  };
  return (
    <>
      {login == true ? (
        <Navigate to="/" replace={true} />
      ) : (
        <Form
          autoComplete="off"
          style={{ maxWidth: 500 }}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 18 }}
          onSubmitCapture={handelSubmit}
        >
          <Form.Item
            label="UserName"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              onChange={(e) => setUsername(e.target.value.toLocaleLowerCase())}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              onChange={(e) => setPassword(e.target.value.toLocaleLowerCase())}
            />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 3, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}

export default Login;
