import React, {  useEffect, useState } from 'react';
import { getAllUsers } from '../api/Users';


const AllUsersContext = React.createContext<any>({});

export const AllUsers = ({children}:any)=>{
  
    const store_token: string = localStorage.getItem('admin_token') || '';
    const [totalUsers, setTotalUsers] = useState<any[]>();

    useEffect(() => {
        getAllUsers( setTotalUsers, store_token);
        console.log(totalUsers, 'tc')
    }, []);

    const value =  { totalUsers}

    return <AllUsersContext.Provider  value={value}> {children}</AllUsersContext.Provider>
}

export const allUsersStore = ()=> React.useContext(AllUsersContext);

