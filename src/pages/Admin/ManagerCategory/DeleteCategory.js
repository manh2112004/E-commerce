import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { deleteCategory } from "../../../Services/adminServices";
function DeleteCategory(props) {
  const { item, onReload } = props;
  const handleDelete = async () => {
    const response = await deleteCategory(item.id);
    if (response) {
      alert("Xóa danh mục thành công!");
      onReload();
    } else {
      alert("Lỗi khi xóa danh mục.");
    }
  };
  return (
    <>
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
export default DeleteCategory;
