import { useEffect, useState } from "react";
import { Category, Products } from "../../Services/userServices";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import "./Home.css";
function Home() {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      const response = await Category();
      setCategory(response);
    };
    fetchAPI();
  }, []);
  useEffect(() => {
    const fetchAPI = async () => {
      const response = await Products();
      setProduct(response);
    };
    fetchAPI();
  }, []);
  const result = category.map((item) => {
    const childCate = (item.children ?? []).map((child) => child.id);
    const filterProduct = product.filter((prod) =>
      childCate.includes(prod.categoryId)
    );
    return {
      name: item.name,
      products: filterProduct,
    };
  });
  console.log(result);
  return (
    <>
      {result.map((item) => {
        const checked = item.products.length;
        return (
          <>
            <div className="product">
              <Row gutter={[30, 30]}>
                <>
                  <Col span={24}>
                    <h1 className="product__title">{item.name}</h1>
                  </Col>
                </>
              </Row>
              <Row gutter={[30, 30]} style={{ padding: "0 100px" }}>
                {checked == 0 ? (
                  <Col span={24}>
                    <h3 className="title-empty">
                      Danh Mục con hoặc sản phẩm đang trống
                    </h3>
                  </Col>
                ) : null}
              </Row>
              <Row gutter={[20, 20]} style={{ padding: "0 100px" }}>
                {item.products.map((item, index) => (
                  <>
                    <Col
                      span={6}
                      key={item.id}
                      style={{
                        marginTop: index >= 4 ? "100px" : "0px",
                      }}
                    >
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
                  </>
                ))}
              </Row>
            </div>
          </>
        );
      })}
    </>
  );
}
export default Home;
