import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import "./ManagerCategory.css";
import { useEffect, useState } from "react";
import { Category } from "../../../Services/userServices";
import { createCategory } from "../../../Services/adminServices";
import DeleteCategory from "./DeleteCategory";
import EditCategory from "./EditCategory";
import TableCategory from "./TableCategory";
import { PlusOutlined } from "@ant-design/icons";
function MangerCategory() {
  const [category, setCategory] = useState([]);
  const [modal, setModal] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const fetchAPI = async () => {
    const response = await Category();
    setCategory(response);
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  const handleReload = () => {
    fetchAPI();
    messageApi.success("Cập nhật danh mục thành công!");
  };
  const showModal = () => {
    setModal(true);
  };
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setModal(false);
    form.resetFields();
  };
  const handleSubmit = async (values) => {
    try {
      const response = await createCategory({
        name: values.name,
        children: values.parentId || null,
      });
      message.success("Thêm danh mục thành công!");
      handleReload();
      form.resetFields();
      handleCancel();
    } catch (err) {
      message.error("Lỗi khi thêm danh mục.");
    }
  };
  return (
    <>
      {contextHolder}
      <div className="header__category">
        <h2>Danh Mục</h2>
        <Button type="primary" onClick={showModal}>
          Thêm Danh Mục
          <PlusOutlined />
        </Button>
      </div>
      <Modal
        title="Thêm Danh Mục"
        open={modal}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Thêm"
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Tên Danh Mục"
            name="name"
            rules={[
              { required: true, message: "Không được để trống tên danh mục" },
            ]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>
          <Form.Item label="Danh Mục Cha (nếu có)" name="parentId">
            <Select
              allowClear
              placeholder="Không chọn nếu là danh mục cha"
              options={category.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
      <TableCategory
        category={category}
        onReload={handleReload}
        modalVisible={modal}
        setModalVisible={setModal}
      />
    </>
  );
}
export default MangerCategory;
