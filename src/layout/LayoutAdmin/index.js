import { Button, Dropdown, Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {
  SearchOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  UserOutlined,
  MailOutlined,
  ProductOutlined,
  UserSwitchOutlined,
  GroupOutlined,
} from "@ant-design/icons";
import "./LayoutAdmin.css";
import { Children, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import HomeAdmin from "../../pages/Admin/HomeAdmin";
function LayoutAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const handleClick = () => {
    setCollapsed(!collapsed);
  };
  const menu = [
    {
      key: 1,
      label: "Thông báo 1",
    },
    {
      key: 2,
      label: "Thông báo 2",
    },
    {
      key: 3,
      label: "Thông báo 3",
    },
  ];
  const items = [
    {
      label: "Management Store",
      key: "product",
      icon: <ProductOutlined />,
      children: [
        {
          label: <Link to={"managerCategory"}>Portfolio</Link>,
          key: "category",
          icon: <GroupOutlined />,
        },
        {
          label: <Link to={"managerProduct"}>Products</Link>,
          key: "product",
          icon: <GroupOutlined />,
        },
      ],
    },
    {
      label: <Link to={"managerUser"}>Account information</Link>,
      key: "user",
      icon: <UserSwitchOutlined />,
    },
  ];
  return (
    <>
      <Layout className="layout__admin">
        <header className="header__admin">
          <div
            className={
              "header__logo " + (collapsed && "header__logo--collapsed")
            }
          >
            <Link to={"/admin"}>
              <img
                src={
                  collapsed
                    ? "https://img.freepik.com/premium-vector/simple-handmade-crafting-logo-design-template_76712-507.jpg?w=2000"
                    : "https://i.pinimg.com/736x/6d/c7/db/6dc7dbde9ed8a95d6d54ae3a17ce51b8.jpg"
                }
              />
            </Link>
          </div>
          <div className="header__nav">
            <div className="header__nav-left">
              <div className="header__collapse" onClick={handleClick}>
                <MenuUnfoldOutlined />
              </div>
              <div className="header__search">
                <SearchOutlined />
              </div>
            </div>
            <div className="header__nav-right">
              <div className="bell">
                <Dropdown trigger={["click"]} menu={{ items: menu }}>
                  <BellOutlined />
                </Dropdown>
              </div>
              <div className="avatar">
                <UserOutlined />
              </div>
            </div>
          </div>
        </header>
        <Layout>
          <Sider
            className="sider"
            collapsed={collapsed ? true : false}
            theme="light"
            width={200}
          >
            <Menu items={items} mode="inline" />
          </Sider>
          <Content className="content">
            <Outlet />
            <Button type="primary">
              <Link to={"/"}>Quay Lại Store</Link>
            </Button>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
export default LayoutAdmin;
