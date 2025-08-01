import React, {  memo, useCallback, useEffect, useState } from 'react';
import { getAllUsers, getUser, loginUser } from '../api/Users';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  useEffect(() => {
    if (hasToken) {
        fetchUser();
      }

  }, [hasToken]);

  useEffect(() => {
  if (!store_token || !id) {
    localStorage.removeItem("token"); // Optional: clear stale token
    navigate("/login", { replace: true });
  }
}, [store_token, id, navigate]);

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

    try {
    await getUser(id, store_token, handleUser);
  } catch (error) {
    console.error("Invalid token or user fetch failed", error);
    navigate('/login'); // force logout if token is bad
  } finally {
    setIsLoading(false);
  }
  };

  const value = { handleUser, handleChange,handleSubmit,setToken, hastoken, id, user, isLoading };

  return <Context.Provider value={value}> {children}</Context.Provider>;
});

export const useAuth = () => React.useContext(Context);


function router(_arg0: string) {
    throw new Error('Function not implemented.');
}

