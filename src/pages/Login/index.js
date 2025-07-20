import { Button, Checkbox, Col, Form, Input, message, Row } from "antd";
import "./Login.css";
import { login } from "../../Services/userServices";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";
function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Tài khoản hoặc mật khẩu không chính xác",
    });
  };
  const onFinish = async (values) => {
    const userName = values.username;
    const pass = values.password;
    const response = await login(userName, pass);
    if (response.length > 0) {
      setCookie("id", response[0].id);
      setCookie("email", response[0].email);
      setCookie("token", response[0].token);
      setCookie("isLogin", true);
      dispatch(checkLogin(true));
      navigate("/");
    } else {
      error();
    }
  };
  return (
    <>
      {contextHolder}
      <Row className="form__login">
        <h1>Đăng Nhập</h1>
        <Col span={24} className="form_main">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
export default Login;
