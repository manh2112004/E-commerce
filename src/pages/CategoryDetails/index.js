import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { categoryDetails } from "../../Services/userServices";

function CategoryDetails() {
  const param = useParams();
  const [productDetail, setProductDetail] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      const response = await categoryDetails(param.id);
      setProductDetail(response);
    };
    fetchAPI();
  }, [param.id]);
  console.log(productDetail);
  return (
    <>
      <Row gutter={[20, 20]} style={{ padding: "50px 100px" }}>
        {productDetail.map((item) => {
          return (
            <Col span={6}>
              <Link to={"/productDetails/" + item.id}>
                <div className="product__item">
                  <img src={item.image} alt="" />
                  <h3>{item.name}</h3>
                  <p className="product__item-price">
                    {item.price.toLocaleString("vi-VN")}đ
                  </p>
                </div>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
export default CategoryDetails;
