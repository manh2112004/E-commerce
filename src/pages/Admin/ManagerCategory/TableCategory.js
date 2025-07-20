import { Col, Row, Space } from "antd";
import { Category } from "../../../Services/userServices";
import { useEffect, useState } from "react";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

function TableCategory(props) {
  const { category, onReload, modalVisible, setModalVisible, form } = props;
  return (
    <>
      <Row justify={"center"} className="Row__Category-header">
        <Col span={6} className="Col__Category">
          ID
        </Col>
        <Col span={6} className="Col__Category">
          Name
        </Col>
        <Col span={6} className="Col__Category">
          Category Type
        </Col>
        <Col span={6} className="Col__Category"></Col>
      </Row>
      {category.map((item) => {
        return (
          <Row justify={"center"} className="Row__Category-body">
            <Col span={6} className="Col__Category">
              {item.id}
            </Col>
            <Col span={6} className="Col__Category">
              {item.name}
            </Col>
            <Col span={6} className="Col__Category">
              Cha
            </Col>
            <Col span={6} className="Col__Category">
              <Space size={"middle"}>
                <EditCategory item={item} onReload={onReload} />
                <DeleteCategory item={item} onReload={onReload} />
              </Space>
            </Col>
          </Row>
        );
      })}
    </>
  );
}
export default TableCategory;
