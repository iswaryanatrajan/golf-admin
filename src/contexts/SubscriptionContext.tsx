import React, { memo, useCallback, useEffect, useState } from 'react';
import {getEventFee, getTeacherFee, setUpEventPayment  } from '../api/subscriptionFee';

const SubscriptionContext = React.createContext<any>({});

export const SubscriptionProvider = ({children}: any) => {
   const [feeModel, setModel] = useState(null); 
   const [teacherFeeModel, setTeacherModel] = useState(null);
    const [loading, setLoading] = useState<any>(true);
   
    const [eventFee, setEventFee] = useState(null);
    const [teacherFee, setTeacherFee] = useState(null);
    useEffect(()=>{
        getEventFee(setEventFee, handleLoading);
        getTeacherFee(setTeacherFee, handleLoading);
    },[loading])

  

    const handleLoading = useCallback((value: any) => {
        setLoading(value);
    }, []);
    const handleModel = useCallback((value: any) => {
        setModel(value);
    }, []);
    const handleTeacherModel = useCallback((value: any) => {
        setTeacherModel(value);
    }, []);

      
    const value = {
        eventFee,
        teacherFee,
        teacherFeeModel,
        feeModel,
        handleLoading,
        handleModel,
        handleTeacherModel
    };

    return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
};

export const useSubscription = () => React.useContext(SubscriptionContext);
