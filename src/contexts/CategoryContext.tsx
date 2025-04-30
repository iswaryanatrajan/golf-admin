import React, { memo, useCallback, useEffect, useState } from 'react';
import { getCategories, getCategory, postCategory, putCategories,unassignCategories, deleteCategory,updateCategory  } from '../api/category';

const CategoryContext = React.createContext<any>({});

export const CategoryProvider = ({children}: any) => {
    const [category, setCategory] = useState<any>([]);
    const [categories, setCategories] = useState<any>([]);
    const [loading, setLoading] = useState<any>(true);
    const [formdata, setFormdata] = useState<any>(null);
    const [userId, setUserId] = useState<any>(null);  

    useEffect(() => {
        getCategory(handleCategory, handleLoading);
        getCategories(handleCategories, handleLoading);
  
    }, [loading]);

    const handleCategory = useCallback((value: any) => {
        setCategory(value);
    }, []);

    const handleCategories = useCallback((value: any) => {
        setCategories(value);
    }, []);

    const handleLoading = useCallback((value: any) => {
        setLoading(value);
    }, []);

    const handleCategoryFormData = useCallback((value: any) => {
        setFormdata(value);
    }, []);
    const hanldeUserId = useCallback((value: any) => {
        setUserId(value);
    }, []);
    const handleDeleteCategory = useCallback(async (categoryId: string) => {
        setLoading(true);
        try {
          await deleteCategory(categoryId, setLoading);
         
          getCategories(handleCategories, handleLoading);
        } catch (error) {
          console.error('Error deleting category:', error);
          setLoading(false);
        }
      }, [getCategories, handleCategories, handleLoading]);
      
    const value = {
        category,
        categories,
        loading,
        formdata,
        getCategory,
        getCategories,
        handleCategory,
        handleCategories,
        handleLoading,
        handleCategoryFormData,
        hanldeUserId,
        handleDeleteCategory 
    };

    return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
};

export const useCategory = () => React.useContext(CategoryContext);
