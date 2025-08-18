import React, {  useCallback, useEffect, useState } from 'react';
import { fetchTeachers } from '../api/Teacher';


const TeacherCreateContext = React.createContext<any>({});

export const TeacherContext = ({children}:any)=>{
  
    const [teachers, setTeachers] = useState<any[]>([]);
    const store_token: string = localStorage.getItem('admin_token') || '';
    const [teachersCount, setEventsCount] = useState<any[]>([]);

    useEffect(() => {
        fetchTeachers(setTeachers, setEventsCount, store_token);
    }, []);

    const handleTeachers = useCallback((value: any) => {
        return setTeachers(value);
    }, [teachers]);
    const value =  { handleTeachers, teachers, teachersCount}

    return <TeacherCreateContext.Provider  value={value}> {children}</TeacherCreateContext.Provider>
}

export const teacherContextStore = ()=> React.useContext(TeacherCreateContext);

