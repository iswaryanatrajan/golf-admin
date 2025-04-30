import axios from "axios";
import { API_ENDPOINTS } from "./apiConfig";
import toast from "react-hot-toast";



export const setUpEventPayment = async (fee: any, setLoading: any) => {
    try {
        const response = await axios.post(
            API_ENDPOINTS.SETUPEVENTPAYMENT,
            fee ,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        setLoading(response.data);
        toast.success("Payment setup successfully");
    } catch (error) {
        toast.error("Error setting up payment");
        throw error;
    }
};
export const updateEventPayment = async (fee: any, setLoading: any) => {
    try {
        const response = await axios.put(
            API_ENDPOINTS.UPDATEEVENTPAYMENT,
            fee ,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        setLoading(response.data);
        toast.success("Payment setup successfully");
    } catch (error) {
        toast.error("Error setting up payment");
        throw error;
    }
};
export const getEventFee = async (setFee: any, setLoading: any) => {
    try {
        const response = await axios.get(
            API_ENDPOINTS.GETEVENTPAYMENT,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        setFee(response.data.fee);
        toast.success("Payment setup successfully");
    } catch (error) {
        toast.error("Error setting up payment");
        throw error;
    }finally{
        setLoading(false);
    }
};

// teacher fee
export const setUpTeacherPayment = async (fee: any, setLoading: any) => {
    try {
        const response = await axios.post(
            API_ENDPOINTS.SETUPTEACHERPAYMENT,
            fee ,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        setLoading(response.data);
        toast.success("Payment setup successfully");
    } catch (error) {
        toast.error("Error setting up payment");
        throw error;
    }
};
export const updateTeacherPayment = async (fee: any, setLoading: any) => {
    try {
        const response = await axios.put(
            API_ENDPOINTS.UPDATETEACHERPAYMENT,
            fee ,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        setLoading(response.data);
        toast.success("Payment setup successfully");
    } catch (error) {
        toast.error("Error setting up payment");
        throw error;
    }
};
export const getTeacherFee = async (setFee: any, setLoading: any) => {
    try {
        const response = await axios.get(
            API_ENDPOINTS.GETTEACHERPAYMENT,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        setFee(response.data.fee);
        toast.success("Payment setup successfully");
    } catch (error) {
        toast.error("Error setting up payment");
        throw error;
    }finally{
        setLoading(false);
    }
};

