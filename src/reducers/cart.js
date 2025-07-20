const initialState = JSON.parse(localStorage.getItem("cart")) || [];
const cartReducers = (state = initialState, action) => {
  let newState = [...state];
  switch (action.type) {
    case "ADD_TO_CART":
      newState = [...state, { id: action.id, info: action.info, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    case "UPDATE_QUANTITY":
      const itemUpdate = newState.find((item) => item.id === action.id);
      if (itemUpdate) {
        itemUpdate.quantity += action.quantity;
        localStorage.setItem("cart", JSON.stringify(newState));
      }
      return newState;

    case "DELETE_CART":
      newState = newState.filter((item) => item.id !== action.id);
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;

    default:
      return state;
  }
};

export default cartReducers;
