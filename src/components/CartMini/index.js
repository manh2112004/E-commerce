import { Link } from "react-router-dom";
import "../../layout/LayoutUser/LayoutUser.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
function CartMini() {
  const cart = useSelector((state) => state.cartReducers);
  const cartLocal = localStorage.getItem("cart");
  const cartItem = JSON.parse(cartLocal);
  const total = cartItem.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
  return (
    <>
      <Link to={"/cart"}>
        {" "}
        <div className="header__cart-icon">
          <ShoppingCartOutlined style={{ fontSize: "25px" }} />
        </div>
        <div className="header__cart-info">
          <p>Giỏ hàng</p>
          <span>({total}) </span>Sản phẩm
        </div>
      </Link>
    </>
  );
}
export default CartMini;
