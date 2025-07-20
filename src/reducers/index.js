import { combineReducers } from "redux";
import cartReducers from "./cart";
import loginReducers from "./login";
const allReducers = combineReducers({
    cartReducers,
    loginReducers
});
export default allReducers;
