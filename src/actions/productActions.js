import axios from 'axios'
import {
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_REQUEST,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL
} from "../constants/productConstants";

const api = axios.create({
	baseURL: "https://adams-proshop-api.onrender.com/api/products"
});


export const listProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });

		const { data } = await api.get('/');
		console.log(data)

		dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });

	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		})
	}
}

export const listProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST })
		const { data } = await api.get(`/${id}`)

		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		})
	}
}
