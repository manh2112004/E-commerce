import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  DownOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Dropdown, Col, Row, Input, Form, Button, message } from "antd";
import { useEffect, useState } from "react";
import { Category, searchProducts } from "../../Services/userServices";
import "./LayoutUser.css";
import Search from "antd/es/transfer/search";
import CartMini from "../../components/CartMini";
import { getCookie } from "../../helpers/cookie";
import { useSelector } from "react-redux";
function LayoutUser() {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const token = getCookie("token");
  const isLogin = useSelector((state) => state.loginReducers);
  const [messageApi, contextHolder] = message.useMessage();
  const error = () => {
    messageApi.open({
      type: "error",
      content: "vui lòng nhập đúng,đủ tên sản phẩm",
    });
  };
  useEffect(() => {
    const fetchAPI = async () => {
      const response = await Category();
      setCategory(response);
    };
    fetchAPI();
  }, []);
  const handleMenuClick = (e) => {
    navigate("/category-details/" + e.key);
  };
  const handleSearch = async (e) => {
    const response = await searchProducts(e.search);
    if (response.length == 0) {
      error();
    } else {
      response.map((item) => navigate("/category-details/" + item.categoryId));
    }
    form.resetFields(["search"]);
  };
  return (
    <>
      {contextHolder}
      <header className="header">
        <Row align={"middle"}>
          <Col span={3}>
            <div className="header__logo">
              <Link to={"/"}>
                {" "}
                <img
                  src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/58277a103091715.5f456d683c1d7.png"
                  alt=""
                />
              </Link>
            </div>
          </Col>
          <Col span={9}>
            <div className="header__menu">
              <ul>
                {category.map((item) => {
                  const items =
                    item.children?.map((child) => ({
                      key: child.id,
                      label: child.name,
                    })) || [];
                  return (
                    <li key={item.id}>
                      <Dropdown menu={{ items, onClick: handleMenuClick }}>
                        <div className="header__menu-item">
                          {item.name}
                          <DownOutlined className="menu-icon" />
                        </div>
                      </Dropdown>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Col>
          <Col span={6}>
            <div className="header__search">
              <Form layout="inline" onFinish={handleSearch} form={form}>
                <Form.Item name="search" style={{ marginRight: 5 }}>
                  <Input placeholder="Nhập từ khoá" />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" type="primary">
                    <SearchOutlined />
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
          <Col span={3}>
            <div className="header__cart">
              <CartMini />
            </div>
          </Col>
          <Col span={3}>
            {isLogin && token ? (
              <>
                <Button type="dashed" style={{ marginRight: 5 }}>
                  <Link to={"/admin"}> Quản lý</Link>
                </Button>
                <Button type="primary">
                  <Link to={"/logout"}>Đăng Xuất</Link>
                </Button>
              </>
            ) : (
              <>
                <Button type="dashed" style={{ marginRight: 5 }}>
                  <Link to={"/login"}> Đăng Nhập</Link>
                </Button>
                <Button type="primary">Đăng Ký</Button>
              </>
            )}
          </Col>
        </Row>
      </header>
      <main className="main">
        <Outlet />
      </main>
      {/* <footer className="footer">
        copyright manh-prime
      </footer> */}
    </>
  );
}
export default LayoutUser;
