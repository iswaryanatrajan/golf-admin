import axios from "axios";
import { API_ENDPOINTS } from "./apiConfig";
export let headers:any = {
  "ngrok-skip-browser-warning": "69420"
};


  export const fetchAllPosts = async(setPosts:any,setTotalPosts: any, token: any) => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.GETTOTALPOSTS}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { category:"all" , page: 1, pageSize: 500 },

      });
      if (response.status == 200) {
        setTotalPosts(response.data.count);
        setPosts(response.data.posts);
      }
    }

    catch(error) {
      console.log(error, 'error')
    }
  }
  export const fetchSinglePosts = async (setSinglePosts: any, id: any) => {
    try {
      const token = localStorage.getItem("token");
      let endpoint = API_ENDPOINTS.GETPOSTBYID + id;
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
        endpoint = API_ENDPOINTS.GETPOSTBYID + id;
      }
      const response = await axios.get(endpoint, {
        headers,
      });
      console.log(response);
      setSinglePosts(response.data.post);
    } catch (error) {
      throw error;
    }
  };
  
export const deletePost = async (postId: any,setMessage:any) => {
  try {
      const token = localStorage.getItem("token");
      let endpoint = API_ENDPOINTS.DELETEPOST +postId ;
      const headers: any = {
        "ngrok-skip-browser-warning": "69420"
      };
      if (token && token !== "undefined") {
          headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.delete(endpoint, { headers });

      setMessage(response.data.message);
  } catch (error) {
    
  }
};

  