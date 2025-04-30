import React, {  memo, useCallback, useEffect, useState } from 'react';
import { getAllUsers, getUser, loginUser } from '../api/Users';
interface IUser {
  nickName: string;
  email: string;
  imageUrl: string;
}

const Context = React.createContext<any>({});

export const AuthContext = memo(({ children }: any) => {
  const store_token: string = localStorage.getItem('token') || '';
  const id: string = localStorage.getItem('id') || '';
  const hasToken = !!store_token && !!id;
  
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [hastoken, setToken] = useState<boolean>(hasToken);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (hasToken) {
        fetchUser();
      }

  }, [hasToken]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const success = await loginUser(formData, setToken);
    if (success) {
        router('/')
      }
  };

  const handleUser = useCallback(
    (value: any) => {
      return setUser(value);
    },
    [user],
  );

  const fetchUser = async () => {
    setIsLoading(true);
    await getUser(id, store_token, handleUser);
    setIsLoading(false);
  };

  const value = { handleUser, handleChange,handleSubmit,setToken, hastoken, id, user, isLoading };

  return <Context.Provider value={value}> {children}</Context.Provider>;
});

export const useAuth = () => React.useContext(Context);


function router(_arg0: string) {
    throw new Error('Function not implemented.');
}

