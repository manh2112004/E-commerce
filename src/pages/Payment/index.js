import { Button, Col, Form, Input, Radio, Row, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";
import "./Payment.css";
import { Link } from "react-router-dom";
function Payment() {
  const cart = useSelector((state) => state.cartReducers);
  let total = 0;
  const city = [
    {
      label: "Hà nội",
      value: "Hà nội",
    },
    {
      label: "Đà Nẵng",
      value: "Đà nẵng",
    },
    {
      label: "TP Hồ Chí Minh",
      value: "Hồ Chí Minh",
    },
    {
      label: "Nha Trang",
      value: "Nha Trang",
    },
  ];
  const district = [
    {
      label: "Phúc Thọ",
      value: "Phúc Thọ",
    },
    {
      label: "Đan Phượng",
      value: "Đan Phượng",
    },
  ];
  cart.map((item) => {
    const price = item.info.price;
    return (total += item.quantity * price);
  });
  return (
    <>
      <Row style={{ padding: "50px 200px" }}>
        <Col span={16}>
          <Row gutter={[20, 20]}>
            <Col span={8}>
              <h2>Thông tin nhận hàng</h2>
              <Form>
                <Form.Item>
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item>
                  <Input placeholder="Họ và Tên" />
                </Form.Item>
                <Form.Item>
                  <Input placeholder="Số điện thoại" />
                </Form.Item>
                <Form.Item>
                  <Input placeholder="Địa Chỉ" />
                </Form.Item>
                <Form.Item>
                  <Select placeholder="Địa Chỉ" options={city} />
                </Form.Item>
                <Form.Item>
                  <Select placeholder="Quận Huyện" options={district} />
                </Form.Item>
                <Form.Item>
                  <TextArea placeholder="Ghi chú (tuỳ chọn)" rows={3} />
                </Form.Item>
              </Form>
            </Col>
            <Col span={8}>
              <h2>Thanh Toán</h2>
              <Form>
                <Form.Item>
                  <input type="radio" name="payment" />
                  <span>Chuyển Khoản qua ngân hàng</span>
                </Form.Item>
                <Form.Item>
                  <input type="radio" name="payment" />
                  <span>Thanh toán khi nhận hàng</span>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <h2>Đơn Hàng</h2>
          <Row gutter={[20, 20]}>
            {cart.map((item) => {
              const result = item.info.price * item.quantity;
              return (
                <Col>
                  <div className="product__pay">
                    <img src={item.info.image} />
                    <p>{item.info.name}</p>
                    <p>{result.toLocaleString("vi-VN")}đ</p>
                  </div>
                </Col>
              );
            })}
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col span={18}>
              <Input placeholder="Nhập mã giảm giá" />
            </Col>
            <Col span={6}>
              <Button>Áp dụng</Button>
            </Col>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <Col style={{ fontSize: "20px" }} span={19}>
              Tổng cộng
            </Col>
            <Col span={5} style={{ fontSize: "20px" }}>
              {total}
            </Col>
          </Row>
          <Row  className="Row__payment">
            <Col span={18}>
              <Link to={"/cart"}>Quay lại giỏ hàng</Link>
            </Col>
            <Col span={6}><Button type="primary">Thanh Toán</Button></Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
export default Payment;
