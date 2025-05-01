import axios from "axios";
import {
  reviewRequest,
  providerReviewRequest,
  reviewSuccess,
  reviewFail,
  addReviewSuccess,
  allReviewSuccess,
} from "./review.reducer";

export const addReview = (data) => async (dispatch) => {
  try {
    dispatch(reviewRequest());
    const review = await axios({
      method: "POST",
      url: "http://localhost:4000/api/v1/review",
      data,
    });
    dispatch(addReviewSuccess(review.data));
  } catch (error) {
    return dispatch(reviewFail(error.response.data.message));
  }
};
export const getAllReview = () => async (dispatch) => {
  try {
    dispatch(reviewRequest());
    const review = await axios({
      method: "GET",
      url: `http://localhost:4000/api/v1/review`,
    });
    dispatch(allReviewSuccess(review.data));
  } catch (error) {
    return dispatch(reviewFail());
  }
};

export const getProvidersReview = (_id) => async (dispatch) => {
  try {
    console.log("📤 Fetching review for provider ID:", _id);

    if (!_id) {
      console.error("❌ Error: _id is undefined or null");
      return dispatch(reviewFail("Provider ID is missing"));
    }

    dispatch(providerReviewRequest());
    const review = await axios({
      method: "GET",
      url: `http://localhost:4000/api/v1/review/${_id}`, // Fix: use dynamic _id in the URL
    });
    console.log("✅ Review received for provider:", review.data);
    dispatch(reviewSuccess(review.data));
  } catch (error) {
    console.error("❌ Error fetching provider review:", error.response?.data?.message);
    return dispatch(reviewFail());
  }
};


