import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { productDetails, Reviews } from "../../Services/userServices";
import { Button, Col, Rate, Row, Space, Tag } from "antd";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../../actions/cart";
function ProductDetails() {
  const param = useParams();
  let quantity_rate = 0;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducers);
  const [product, setProduct] = useState([]);
  const [review, setReview] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      const response = await productDetails(param.id);
      setProduct(response);
    };
    fetchAPI();
  }, [param.id]);
  useEffect(() => {
    const fetchAPI = async () => {
      const response = await Reviews();
      setReview(response);
    };
    fetchAPI();
  }, []);
  const handleAddToCart = () => {
    if (cart.some((itemCart) => itemCart.id === product.id)) {
      dispatch(updateQuantity(product.id));
    } else {
      dispatch(addToCart(product.id, product));
    }
  };
  review.map((item) => {
    if (item.productId == product.id) {
      quantity_rate++;
    }
  });
  const productId = parseInt(product.id);
  const relatedReviews = review.filter((r) => r.productId === productId);
  const averageRating =
    relatedReviews.length > 0
      ? relatedReviews.reduce((sum, r) => sum + r.rating, 0) /
        relatedReviews.length
      : 0;
  const productWithRating = {
    ...product,
    rating: averageRating,
  };
  if (!productWithRating.id) return null;
  return (
    <>
      <Row style={{ padding: "30px 200px" }}>
        <Col span={10}>
          <div className="ProductDetails__image">
            <img src={productWithRating.image} alt="" />
          </div>
        </Col>
        <Col span={14}>
          <h1 className="ProductDetails__title">{productWithRating.name}</h1>
          <div className="ProductDetails__rate">
            <Row>
              <Col span={12}>
                <span className="ProductDetails__rate-custom">
                  {productWithRating.rating}
                </span>
                <Rate allowHalf defaultValue={5} disabled />
              </Col>
              <Col span={12}>
                <p className="quantity-rate">{quantity_rate} lượt đánh giá</p>
              </Col>
            </Row>
          </div>
          <div className="ProductDetails__status">
            <span>Trạng thái </span>
            <Tag color={product.status ? "green" : "red"}>
              {product.status ? "còn hàng" : "hết hàng"}
            </Tag>
          </div>
          <p className="ProductDetails__price">
            Giá:{" "}
            <strong>{productWithRating.price.toLocaleString("vi-VN")}đ</strong>
          </p>
          <div className="boder--bottom"></div>
          <p className="ProductDetails__desc">
            {productWithRating.description}
          </p>
          <Row style={{ marginTop: 40 }} gutter={[20, 20]}>
            <Col span={24}>
              <Space size={"middle"}>
                <Button
                  onClick={handleAddToCart}
                  size="large"
                  style={{ backgroundColor: "#f8bc4b" }}
                  disabled={productWithRating.status ? false : true}
                >
                  Thêm Vào Giỏ Hàng
                </Button>
                <Button
                  size="large"
                  style={{ backgroundColor: "#E32124" }}
                  onClick={handleAddToCart}
                  disabled={productWithRating.status ? false : true}
                >
                  <Link to={"/payment"}>Đặt Hàng</Link>
                </Button>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
export default ProductDetails;
