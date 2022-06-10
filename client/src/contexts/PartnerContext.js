import { createContext, useReducer } from 'react';
import axios from 'axios';
import { partnerReducer } from '../reducers/PartnerReducer';
import { apiUrl, aspUrl, GROCERY_LOAD_FAIL, GROCERY_LOAD_SUCCESS, GROCERYBYID_LOAD_SUCCESS, GROCERYBYID_LOAD_FAIL } from './constants';

export const PartnerContext = createContext();

const PartnerContextProvider = ({ children }) => {
    const [partnerState, dispatch] = useReducer(partnerReducer, {
        seller: null,
        shipper: null,
        sellers: [],
        shippers: [],
        groceries: [],
        unaccepted: [],
        accepted: []
    })

    // Đăng ký bán hàng 
    const registerSeller = async (data) => {
        try {
            const response = await axios.post(`${apiUrl}/partner/seller`, data);
            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { status: false, message: error.message };
        }
    }

    // Thông tin cửa hàng
    const registerGrocery = async (data) => {
        try {
            const response = await axios.post(`${apiUrl}/partner/grocery`, data);
            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { status: false, message: error.message };
        }
    }

    // Đăng ký giao hộ

    const registerShipper = async (data) => {
        try {
            const response = await axios.post(`${apiUrl}/partner/shipper`, data);
            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { status: false, message: error.message };
        }
    }

    // Lấy thông tin cửa hàng theo mã cửa hàng
    const getGroceryById = async (id) => {
        try {
            const response = await axios.get(`${aspUrl}/grocery/${id}`)
            if (response.data.length === 0) {
                return {
                    status: false, message: "Mã cửa hàng không hợp lệ, vui lòng kiểm tra lại!"
                }
            }
            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { status: false, message: error.message };
        }
    }

    // Lấy tất cả thông tin cửa hàng 
    const getAllGroceries = async () => {
        try {
            const response = await axios.get(`${aspUrl}/grocery`);
            if (response.data) {
                dispatch({
                    type: GROCERY_LOAD_SUCCESS,
                    payload: response.data
                })
            }
        } catch (error) {
            dispatch({
                type: GROCERY_LOAD_FAIL
            })
            return {
                status: false,
                message: "Internal Server Error"
            }
        }
    }
    // Cập nhật thông tin cửa hàng
    const updateGroceryById = async (data, id) => {
        try {
            await axios.put(`${aspUrl}/grocery/${id}`, data);
            return {
                status: true,
                message: "Thông tin cửa hàng đã được cập nhật thành công!"
            }
        } catch (error) {
            return {
                status: false,
                message: "Internal Server Error"
            }
        }
    }

    // Xóa thông tin cửa hàng 
    const deleteGroceryById = async (id) => {
        try {
            await axios.delete(`${aspUrl}/grocery/${id}`);
            return {
                status: true,
                message: "Đã xóa thông tin cửa hàng!"
            }
        } catch (error) {
            return {
                status: false,
                message: "Internal Server Error"
            }
        }
    }

    // Lấy thông tin người bán chưa được chấp nhận
    const getUnacceptedSellers = async () => {
        try {
            const response = await axios.get(`${aspUrl}/seller/unaccepted`);
            if (response.data) {
                dispatch({
                    type: 'UNACCEPTED_LOAD_SUCCESS',
                    payload: response.data
                })
            }
        } catch (error) {
            dispatch({ type: 'UNACCEPTED_LOAD_FAIL' })
            return {
                status: false,
                message: "Internal Server Error"
            }
        }
    }

    // Lấy chi tiết thông tin người bán theo mã 
    const getUnacceptedSellerById = async (id) => {
        try {
            const response = await axios.get(`${aspUrl}/seller/unaccepted/${id}`)
            if (response.data.length === 0) {
                return {
                    status: false, message: "Mã đối tác không hợp lệ, vui lòng kiểm tra lại!"
                }
            }
            return response.data;
        } catch (error) {
            return {
                status: false,
                message: "Internal Server Error"
            }
        }
    }

    // Xóa cửa hàng theo mã người bán 
    const deleteGroBySellerId = async (id) => {
        try {
            await axios.delete(`${aspUrl}/grocery/deleteBySellerId/${id}`);
            return {
                status: true,
                message: "Đã xóa thông tin cửa hàng!"
            }
        } catch (error) {
            return {
                status: false,
                message: "Internal Server Error"
            }
        }
    }

    // Xóa người bán theo mã người bán
    const deleteSellerById = async (id) => {
        try {
            await axios.delete(`${aspUrl}/seller/${id}`);
            return {
                status: true,
                message: "Đã xóa thông tin cửa hàng!"
            }
        } catch (error) {
            return {
                status: false,
                message: "Internal Server Error"
            }
        }
    }

    // Cập nhật trạng thái đơn đăng ký bán hàng 
    const updateUserAccepted = async (id) => {
        try {
            await axios.post(`${aspUrl}/seller/accepted/${id}`);
            return {
                status: true,
                message: "Cập nhật thành công!"
            }
        } catch (error) {
            return {
                status: false,
                message: "Internal Server Error"
            }
        }
    }

    // Cập nhật vai trò người dùng
    const updateSellerRoleById = async (id) => {
        try {
            await axios.post(`${aspUrl}/seller/role/${id}`);
            return {
                status: true,
                message: "Cập nhật thành công!"
            }
        } catch (error) {
            return {
                status: false,
                message: "Internal Server Error"
            }
        }
    }

    // Lấy danh sách người bán đã được duyệt
    const getAcceptedSellers = async () => {
        try {
            const response = await axios.get(`${aspUrl}/seller/accepted`);
            if (response.data) {
                dispatch({
                    type: 'ACCEPTED_LOAD_SUCCESS',
                    payload: response.data
                })
            }
        } catch (error) {
            dispatch({ type: 'ACCEPTED_LOAD_FAIL' })
            return {
                status: false,
                message: "Internal Server Error"
            }
        }
    }

    // Lấy thông tin người bán được duyệt theo mã người bán
    const getAcceptedSellerById = async (id) => {
        try {
            const response = await axios.get(`${aspUrl}/seller/accepted/${id}`)
            if (response.data.length === 0) {
                return {
                    status: false, message: "Mã đối tác không hợp lệ, vui lòng kiểm tra lại!"
                }
            }
            return response.data;
        } catch (error) {
            return {
                status: false,
                message: "Internal Server Error"
            }
        }
    }

    // Lấy thông tin đối tác giao hộ 
    const getShippers = async () => {
        try {
            const response = await axios.get(`${aspUrl}/shipper`);
            if (response.data) {
                dispatch({
                    type: 'SHIPPER_LOAD_SUCCESS',
                    payload: response.data
                })
            }
            return response.data
        } catch (error) {
            dispatch({ type: 'SHIPPER_LOAD_FAIL' })
            return {
                status: false,
                message: "Internal Server Error"
            }
        }
    }

    // Lấy thông tin shipper theo mã
    const getShipperById = async (id) => {
        try {
            const response = await axios.get(`${aspUrl}/shipper/${id}`);
            if (response.data.length === 0) {
                return {
                    status: false, message: "Mã đối tác không hợp lệ, vui lòng kiểm tra lại!"
                }
            }
            return response.data;
        } catch (error) {
            return {
                status: false,
                message: "Internal Server Error"
            }
        }
    }

    // Xóa shipper
    const deleteShipperById = async (id) => {
        try {
            await axios.delete(`${aspUrl}/shipper/${id}`);
            return {
                status: true,
                message: "Đã xóa thông tin người giao hàng!"
            }
        } catch (error) {
            return {
                status: false,
                message: "Internal Server Error"
            }
        }
    }
    const partnerConextData = {
        registerSeller, partnerState, registerShipper, registerGrocery,
        getGroceryById, getAllGroceries, updateGroceryById, deleteGroceryById, getUnacceptedSellers,
        getUnacceptedSellerById, deleteGroBySellerId, deleteSellerById, updateUserAccepted, updateSellerRoleById,
        getAcceptedSellers, getAcceptedSellerById, getShippers, getShipperById, deleteShipperById
    };

    return (
        <PartnerContext.Provider value={partnerConextData}>
            {children}
        </PartnerContext.Provider>
    )
}

export default PartnerContextProvider;