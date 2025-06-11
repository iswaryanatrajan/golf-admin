import axios from "axios";
import { API_ENDPOINTS } from "./apiConfig";
import toast from "react-hot-toast";

export const fetchMembers = async (setMembers: any, setCount: any, token: any, pageNumber: number, pageSize: any) => {
  try {
    const response = await axios.get(API_ENDPOINTS.GETCOMMUNITYMEMBERS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: pageNumber,
        pageSize: pageSize,
      },
    });
    console.log("Full response data:", response.data);
    if (typeof setCount === "function") {
      setCount(response.data.count); // Ensure setCount is a valid function
      console.log("Count updated:", response.data.count);
    } else {
      console.warn("setCount is not a function");
    }
    setMembers(response.data.communityMembers);
    console.log("Community members fetched successfully:", response.data);
  } catch (error) {
    console.error("Error fetching community members:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", error.response?.data || error.message);
    }
  }
};

export const deleteMember = async (memberId: any, isLoading:any) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(`${API_ENDPOINTS.DELETECOMMUNITYMEMBER}/${memberId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      /*let response = await axios.delete(endpoint, {  headers: {
        Authorization: `Bearer ${token}`,
      },
        data: { id: memberId } // Use data for DELETE request payload);
      });*/
      if (response.status === 200) {
        toast.success('Member Deleted Successfully')
      }
    } catch (error) {
      console.error("Error deleting member:", error);
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.clear()
      } else {
     
        toast.error("An error occurred. Please try again.");
      }
    }finally{
      isLoading(false);
    }
  };

export const updateMember = async (updatedUser: any) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_ENDPOINTS.UPDATECOMMUNITYMEMBER}/${updatedUser.id}`, updatedUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Member updated successfully:", response.data);
    toast.success("Member details updated successfully!");
    return true; // Indicate success
  } catch (error) {
    console.error("Error updating member:", error);
    toast.error("Failed to update member.");
    return false; // Indicate failure
  }
};