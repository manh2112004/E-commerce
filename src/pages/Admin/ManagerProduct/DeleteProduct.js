import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteProduct } from "../../../Services/adminServices";
function DeleteProduct(props) {
  const { item, onReload } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const handleDelete = async () => {
    const response = await deleteProduct(item.id);
    if (response) {
      messageApi.open({
        type: "success",
        content: "Đã xoá thành công",
      });
      onReload();
    } else {
      messageApi.open({
        type: "error",
        content: "Đã xoá thất bại",
      });
    }
  };
  return (
    <>
      {contextHolder}
      <Popconfirm
        title="Sure to delete?"
        onConfirm={() => handleDelete(item.id)}
      >
        <Button>
          <DeleteOutlined />
        </Button>
      </Popconfirm>
    </>
  );
}
export default DeleteProduct;
