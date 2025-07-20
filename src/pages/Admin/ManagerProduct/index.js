import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Space,
  Tag,
} from "antd";
import "./ManagerProduct.css";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Category, Products } from "../../../Services/userServices";
import TextArea from "antd/es/input/TextArea";
import { createProduct } from "../../../Services/adminServices";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";
function ManagerProduct() {
  const [showModalProduct, setShowModalProduct] = useState(false);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Thêm Thành công",
    });
    handleReload();
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Thêm Thất Bại",
    });
  };
  const fetchAPI = async () => {
    const response = await Products();
    setProduct(response);
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  const handleReload = () => {
    fetchAPI();
    setShowModalProduct(false);
    form.resetFields();
  };
  useEffect(() => {
    const fetchAPI = async () => {
      const response = await Category();
      setCategory(response);
    };
    fetchAPI();
  }, []);
  function getCategoryNames(categoryId, categories) {
    for (const category of categories) {
      const child = category.children.find((c) => c.id === categoryId);
      if (child) {
        return {
          parentCategoryName: category.name,
          childCategoryName: child.name,
        };
      }
    }
    return {
      parentCategoryName: "Không tìm thấy",
      childCategoryName: "Không tìm thấy",
    };
  }

  const updatedProducts = product.map((item) => {
    const { parentCategoryName, childCategoryName } = getCategoryNames(
      item.categoryId,
      category
    );
    return {
      ...item,
      parentCategoryName,
      childCategoryName,
      status: item.status === "true" || item.status === true,
    };
  });
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
  const handleSubmit = async (values) => {
    const response = await createProduct(values);
    if (response) {
      success();
    } else {
      error();
    }
    form.resetFields();
    setShowModalProduct(false);
  };
  return (
    <>
      {contextHolder}
      <div className="header__product">
        <h2>Quản Lý sản phẩm</h2>
        <Button type="primary" onClick={showModal}>
          <PlusOutlined />
          Thêm Sản Phẩm
        </Button>
        <Modal
          title="Thêm Danh Mục Cha"
          okText="Thêm"
          open={showModalProduct}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} onFinish={handleSubmit}>
            <Form.Item
              label="Tên"
              name={"name"}
              rules={[
                { required: true, message: "Vui lòng nhập tên sản phẩm" },
              ]}
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
                defaultValue="Còn Hàng"
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
                options={updatedProducts.map((item) => {
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
      </div>
      <Row justify={"center"} className="Row__Product-header">
        <Col span={4} className="Col__Product">
          Tên Sản Phẩm
        </Col>
        <Col span={4} className="Col__Product">
          Giá
        </Col>
        <Col span={4} className="Col__Product">
          Trạng Thái
        </Col>
        <Col span={4} className="Col__Product">
          Danh Mục Cha
        </Col>
        <Col span={4} className="Col__Product">
          Danh Mục Con
        </Col>
        <Col span={4} className="Col__Product"></Col>
      </Row>
      <Row justify={"center"} className="Row__Product-body">
        {updatedProducts.map((item) => {
          return (
            <>
              <Col span={4} className="Col__Product">
                {item.name}
              </Col>
              <Col span={4} className="Col__Product">
                {item.price.toLocaleString("vi-VN")}đ
              </Col>
              <Col span={4} className="Col__Product">
                <Tag color={item.status ? "green" : "red"}>
                  {item.status ? "Còn Hàng" : "Hết hàng"}
                </Tag>
              </Col>
              <Col span={4} className="Col__Product">
                {item.parentCategoryName}
              </Col>
              <Col span={4} className="Col__Product">
                {item.childCategoryName}
              </Col>
              <Col span={4} className="Col__Product">
                <Space>
                  <EditProduct
                    item={item}
                    onReload={handleReload}
                    categories={updatedProducts}
                  />
                  <DeleteProduct item={item} onReload={handleReload} />
                </Space>
              </Col>
            </>
          );
        })}
      </Row>
    </>
  );
}
export default ManagerProduct;
