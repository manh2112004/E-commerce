import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    deleteAllCookies();
    dispatch(checkLogin(false));
    navigate("/login");
  }, [dispatch, navigate]);
  return (
    <>
      <button></button>
    </>
  );
}
export default Logout;
