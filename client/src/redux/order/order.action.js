import axios from "axios";
import {
  orderRequest,
  orderFail,
  addOrderSuccess,
  orderSuccess,
  userOrderSuccess,
  updateOrderSuccess,
  updateUserOrderSuccess,
} from "./order.reducer";

// Get all provider orders
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch(orderRequest());
    const orders = await axios.get(`http://localhost:4000/api/v1/order/provider`);
    dispatch(orderSuccess(orders.data));
  } catch (error) {
    return dispatch(orderFail(error.response?.data?.message || "Failed to get orders"));
  }
};

// Get user orders
export const getUserOrders = () => async (dispatch) => {
  try {
    dispatch(orderRequest());
    const orders = await axios.get(`http://localhost:4000/api/v1/order/user`);
    dispatch(userOrderSuccess(orders.data));
  } catch (error) {
    return dispatch(orderFail(error.response?.data?.message || "Failed to get user orders"));
  }
};

// Add a new order
export const addOrder = (data) => async (dispatch) => {
  try {
    dispatch(orderRequest());
    const order = await axios.post(`http://localhost:4000/api/v1/order`, data);
    dispatch(addOrderSuccess(order.data));
  } catch (error) {
    return dispatch(orderFail(error.response?.data?.message || "Failed to add order"));
  }
};

// Update provider-side order
export const updateOrder = (data) => async (dispatch) => {
  try {
    dispatch(orderRequest());

    // 🔍 Debug log to inspect what data is being sent
    console.log("Updating order with data:", data);

    const order = await axios.put(`http://localhost:4000/api/v1/order/updateStatus`, data);

    // 🔍 Optional: log the response too
    console.log("Order update response:", order.data);

    dispatch(updateOrderSuccess(order.data));
  } catch (error) {
    console.error("Update order error:", error.response?.data?.message || error.message);
    return dispatch(orderFail(error.response?.data?.message || "Failed to update order"));
  }
};
// ✅ Updated: Update user-side order and then refresh the user orders list
export const updateUserOrder = (data) => async (dispatch) => {
  try {
    dispatch(orderRequest());
    const response = await axios.put('http://localhost:4000/api/v1/order/updateStatus', data);
    dispatch(updateUserOrderSuccess(response.data));
    dispatch(getUserOrders()); // Refresh order list after update
  } catch (error) {
    return dispatch(orderFail(error.response?.data?.message || "Failed to update user order"));
  }
};

// Delete an order
export const deleteOrder = (data) => async (dispatch) => {
  try {
    dispatch(orderRequest());
    await axios.delete(`http://localhost:4000/api/v1/order/${data.order._id}`);
  } catch (error) {
    return dispatch(orderFail(error.response?.data?.message || "Failed to delete order"));
  }
};
