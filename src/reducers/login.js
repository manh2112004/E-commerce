import { getCookie, setCookie } from "../helpers/cookie";
const init = JSON.parse(getCookie("isLogin")) || [];
const loginReducers = (state = init, action) => {
  switch (action.type) {
    case "CHECK_LOGIN":
      return action.status;
    default:
      return state;
  }
};
export default loginReducers;
