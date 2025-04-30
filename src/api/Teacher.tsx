import axios from "axios";
import { API_ENDPOINTS } from "./apiConfig";

export const fetchTeachers = async (setTeachers:any,setTeachersCount:any, token:any) => {
    try {
    let endpoint = API_ENDPOINTS.GETALLTEACHERSPUBLIC;
    if (token && token !== "undefined") {
      endpoint = API_ENDPOINTS.GETALLTEACHERS;
    }
    const response = await axios.get(endpoint, {
      headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        params: {
          page: 1,
          pageSize: 20,
        },
      });

      if (response.data && response.data.teachers) {
        setTeachersCount(response.data.count);
        setTeachers(response.data.teachers);
        // if (response.data.teachers.length > 0) {
        //   setSelectedTeacher(response.data.teachers[0]);
        // }
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
    
    }
  };
 export  const handleDeleteTeacher = async (teacher_id:any) => {
    try {
      const response = await axios.delete(API_ENDPOINTS.DELETETEACHER + teacher_id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        // params:{
        //   userId: teacher_id
        // }
      });
      if (response.status === 200) {
        alert("Teacher deleted successfully");
        localStorage.removeItem("teacher_id");
       
      }
    } catch (error) {
      console.error("Error deleting teacher:", error);
      alert("Error deleting teacher. Please try again.");
    }
  };
  export const updateTeacher=async (payload:any)=>{
 
    try {
      const response = await axios.put(API_ENDPOINTS.UPDATEUSER, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
       
      });
      if (response.status == 200) {
        
      }
    } catch (error) {
    }
  }