import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./Cart.css";
import { DeleteCart, updateQuantity } from "../../actions/cart";
import { Link } from "react-router-dom";

function Cart() {
  const cart = useSelector((state) => state.cartReducers);
  const dispatch = useDispatch();
  const total = cart.reduce(
    (acc, item) => acc + item.quantity * item.info.price,
    0
  );

  const handleUp = (id, quantity) => {
    if (quantity < 99) {
      dispatch(updateQuantity(id));
    }
  };

  const handleDown = (id, quantity) => {
    if (quantity > 1) {
      dispatch(updateQuantity(id, -1));
    }
  };

  const handleDelete = (id) => {
    dispatch(DeleteCart(id));
  };

  return (
    <>
      {cart.length > 0 ? (
        <div className="table_cart">
          <Row className="Row_Cart-header">
            <Col span={4} className="Column_Cart">
              Sản Phẩm
            </Col>
            <Col span={6} className="Column_Cart">
              Thông tin sản phẩm
            </Col>
            <Col span={4} className="Column_Cart">
              Đơn Giá
            </Col>
            <Col span={4} className="Column_Cart">
              Số Lượng
            </Col>
            <Col span={4} className="Column_Cart">
              Thành tiền
            </Col>
            <Col span={2} className="Column_Cart">
              Xoá
            </Col>
          </Row>

          {cart.map((item) => {
            const totalAmount = item.info.price * item.quantity;
            return (
              <Row className="Row_Cart-body" key={item.id}>
                <Col span={4} className="Column_Cart">
                  <img src={item.info.image} alt={item.info.name} />
                </Col>
                <Col span={6} className="Column_Cart Column_Cart-title">
                  {item.info.name}
                </Col>
                <Col span={4} className="Column_Cart Column_Cart-price">
                  {item.info.price.toLocaleString("vi-VN")}đ
                </Col>
                <Col span={4} className="Column_Cart Column_Cart-quantity">
                  <div className="quantity__button">
                    <Button
                      style={{ fontSize: "40px" }}
                      type="text"
                      onClick={() => handleDown(item.id, item.quantity)}
                    >
                      -
                    </Button>
                    <p>{item.quantity}</p>
                    <Button
                      style={{ fontSize: "40px" }}
                      type="text"
                      onClick={() => handleUp(item.id, item.quantity)}
                    >
                      +
                    </Button>
                  </div>
                </Col>
                <Col span={4} className="Column_Cart Column_Cart-total">
                  {totalAmount.toLocaleString("vi-VN")}đ
                </Col>
                <Col span={2} className="Column_Cart Column_Cart-delete">
                  <Button danger onClick={() => handleDelete(item.id)}>
                    <DeleteOutlined />
                  </Button>
                </Col>
              </Row>
            );
          })}

          <Row className="Row_total">
            <Col className="total_text" span={24}>
              <span>Tổng Tiền: </span> {total.toLocaleString("vi-VN")}đ
            </Col>
          </Row>

          <Row className="Row_total" justify="end">
            <Col>
              <Space size="middle">
                <Link to="/">
                  <button className="Row_button Row_total-cart">
                    Tiếp tục mua hàng
                  </button>
                </Link>
                <Link to="/payment">
                  <button className="Row_button Row_total-pay">Đặt hàng</button>
                </Link>
              </Space>
            </Col>
          </Row>
        </div>
      ) : (
        <div className="noProduct">
          Không có sản phẩm nào trong giỏ hàng. Quay lại cửa hàng để mua sắm.
        </div>
      )}
    </>
  );
}

export default Cart;
