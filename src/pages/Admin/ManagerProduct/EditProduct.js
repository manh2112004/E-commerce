import { Button, Form, Input, InputNumber, message, Modal, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { updateProduct } from "../../../Services/adminServices";
function EditProduct(props) {
  const [form] = Form.useForm();
  const [showModalProduct, setShowModalProduct] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { item, onReload, categories } = props;
  const showModal = () => {
    setShowModalProduct(true);
  };
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    form.resetFields();
    setShowModalProduct(false);
  };
  const handleSubmit = async (e) => {
    const response = await updateProduct(item.id, e);
    if (response) {
      onReload();
      messageApi.open({
        type: "success",
        content: "Cập nhật sản phẩm thành công!",
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Cập nhật sản phẩm thất bại!",
      });
    }
  };
  const handleEdit = () => {
    showModal();
    const statusValue = item.status ? "true" : "false";
    form.setFieldsValue({ ...item, status: statusValue });
  };
  return (
    <>
      {contextHolder}
      <Button onClick={handleEdit}>
        <EditOutlined />
      </Button>
      <Modal
        title="Chỉnh Sửa Sản Phẩm"
        okText="Lưu"
        open={showModalProduct}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Tên"
            name={"name"}
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập Giá" }]}
          >
            <InputNumber
              style={{ width: "50%" }}
              placeholder="nhập giá tiền"
              min={0}
              step={10000}
            />
          </Form.Item>
          <Form.Item label="Trạng Thái" name={"status"}>
            <Select
              style={{ width: 120 }}
              options={[
                { value: "true", label: "Còn Hàng" },
                { value: "false", label: "Hết Hàng" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Danh Mục"
            name={"categoryId"}
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Select
              options={categories.map((item) => {
                return {
                  label: item.childCategoryName,
                  value: item.categoryId,
                };
              })}
            />
          </Form.Item>
          <Form.Item name={"description"}>
            <TextArea rows={4} placeholder="Nhập mô tả" />
          </Form.Item>
          <Form.Item name={"image"}>
            <Input placeholder="đường dẫn ảnh" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default EditProduct;
