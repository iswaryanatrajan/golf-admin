import axios from "axios";
import { API_ENDPOINTS } from "./apiConfig";
import toast from "react-hot-toast";

export const fetchEvents = async (setEvents:any,setCount:any, token:any, pageNumber:number, pageSize:any ) => {
    try {
    
      const response = await axios.get(API_ENDPOINTS.GETALLEVENT, {
        headers: {
            Authorization: `Bearer ${token}`,
          },   
          params: {
            page: pageNumber,
            pageSize: pageSize,
            eventStartDate: '',
            eventEndDate: '',
            status: '',
            place: '',
          },     
      });
      setCount(response.data.count)
      setEvents(response.data.events);
    } catch (error) {
      throw error; 
    }
  };

export const deleteEvent = async (eventId: any, isLoading:any) => {
    try {
      const token = localStorage.getItem("admin_token");
      let endpoint = API_ENDPOINTS.DELETE_EVENT + eventId;
      const headers: any = {
        "ngrok-skip-browser-warning": "69420"
      };
      if (token && token !== "undefined") {
        headers["Authorization"] = `Bearer ${token}`;
      }
      let response = await axios.delete(endpoint, { headers });
      if (response.status === 200) {
  
        toast.success('Event Deleted Successfully')
      }
    } catch (error) {
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