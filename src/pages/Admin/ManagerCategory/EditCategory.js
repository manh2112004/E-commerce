import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, message } from "antd";
import { useEffect, useState } from "react";
import { Category } from "../../../Services/userServices";
import { updateCategory } from "../../../Services/adminServices";
function EditCategory(props) {
  const [form] = Form.useForm();
  const [category, setCategory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { item, onReload } = props;
  const handleEdit = () => {
    setIsModalOpen(true);
    form.setFieldsValue(item);
  };
  const handleSubmit = async (e) => {
    const response = await updateCategory(item.id, e);
    if (response) {
      messageApi.open({
        type: "success",
        content: "Cập nhật danh mục thành công!",
      });
      onReload();
      setIsModalOpen(false);
    } else {
      messageApi.open({
        type: "error",
        content: "Cập nhật danh mục thất bại!",
      });
    }
  };
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  useEffect(() => {
    const fetchAPI = async () => {
      const response = await Category();
      setCategory(response);
    };
    fetchAPI();
  }, []);
  return (
    <>
      <Modal
        title="Sửa Danh Mục"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Cập Nhật"
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
      <Button onClick={handleEdit}>
        <EditOutlined />
      </Button>
    </>
  );
}

export default EditCategory;
