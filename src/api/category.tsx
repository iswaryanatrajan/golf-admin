import axios from "axios";
import { API_ENDPOINTS } from "./apiConfig";
import toast from "react-hot-toast";

export const postCategory = async (formdata:any,setLoading:any) => {
    try {
    
      const response = await axios.post(API_ENDPOINTS.POSTCATEGORY,formdata, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
          },   
         
      });
      setLoading(response.data);
    } catch (error) {
      throw error; 
    }
  };
export const getCategory = async (setCategory:any,setLoading:any) => {
    try {
    
      const response = await axios.get(API_ENDPOINTS.GETCATEGORY, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
          },   
         
      });
      setCategory(response.data);
    } catch (error) {
      throw error; 
    }finally{
        setLoading(false)
    }
  };
export const getCategories = async (setCategories:any,setLoading:any) => {
    try {
    
      const response = await axios.get(API_ENDPOINTS.GETALLCATEGORIES, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
          },   
         
      });
      setCategories(response.data);
    } catch (error) {
      throw error; 
    }finally{
        setLoading(false)
    }
  };
  let randomNum = Math.random();
export const putCategories = async (formdata:any,userId:any, setLoading:any) => {
    try {
    
      const response = await axios.put(API_ENDPOINTS.PUTCATEGORY + userId, formdata, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
          },   
  
      });
      setLoading(randomNum);

    } catch (error) {
      throw error; 
    }
  };
export const unassignCategories = async (formdata:any,userId:any, setLoading:any) => {
    try {

    
      const response = await axios.put(API_ENDPOINTS.UNASSIGNCATEGORY + userId, formdata, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
          },   
         
      });
      setLoading(randomNum);
    } catch (error) {
      throw error; 
    }
  };
  export const deleteCategory = async (categoryId: string, setLoading: (loading: boolean) => void) => {
    setLoading(true);
    try {
      const response = await axios.delete(`${API_ENDPOINTS.DELETECATEGORY}/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      });
      console.log('Category deleted successfully:', response.data);
    } catch (error) {
      console.error('Error deleting category:', error);
    } finally {
      setLoading(false);
    }
  };

  export const updateCategory = async (categoryId:string, formdata:any, setLoading:any) => {
   
    try {
      const response = await axios.put(`${API_ENDPOINTS.UPDATECATEGORY}/${categoryId}`, {"categoryName":formdata}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        },
      });
      toast.success('Category updated successfully!');
      setLoading(response.data);
    } catch (error) {
      toast.error('Error updating category');
      setLoading(false);
      throw error;
    }
  };