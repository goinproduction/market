import { createContext, useReducer } from 'react';
import axios from 'axios';
import { authReducer } from '../reducers/AuthReducer';
import { apiUrl, SET_AUTH, REMOVE_AUTH, LOCAL_STORAGE_TOKEN_NAME, ACCOUNT_LOAD_SUCCESS, ACCOUNT_LOAD_FAIL } from './constants';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
        username: null,
        userId: null,
        accounts: []
    });

    // Login
    const loginUser = async (data) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/signin`, data);
            if (response.data.accessToken) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken
                );
                console.log(response.data.id);
                dispatch({
                    type: SET_AUTH,
                    payload: {
                        isAuthenticated: true,
                        user: response.data,
                        userId: response.data.id,
                        username: response.data.username
                    },
                });
            }
            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { status: false, message: error.message };
        }
    };

    // Register
    const registerUser = async (data) => {
        try {
            const response = await axios.post(
                `${apiUrl}/register`,
                data
            );
            console.log(response)
            // return { status: true, message: response.message };
        } catch (error) {
            return { status: false, message: error.message };
        }
    };
    //Logout
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        dispatch({
            type: REMOVE_AUTH,
            payload: {
                isAuthenticated: false,
                user: null,
            },
        });
    };

    // Get all accounts
    const getAllAccounts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/auth/account`);
            if (response.data) {
                dispatch({
                    type: ACCOUNT_LOAD_SUCCESS,
                    payload: response.data
                })
            }
        } catch (error) {
            dispatch({
                type: ACCOUNT_LOAD_FAIL
            })
        }
    }

    // Lock account 
    const lockAccount = async (id) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/lock/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    // Unlock account 
    const unlockAccount = async (id) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/unlock/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    // Delete account 
    const deleteAccount = async (id) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/delete/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    // Context data
    const authContextData = { loginUser, authState, registerUser, logoutUser, getAllAccounts, lockAccount, unlockAccount, deleteAccount };

    // Return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;