import React, { useEffect, useState } from 'react';
import { updateTeacher } from '../api/Teacher';
import { useCategory } from '../contexts/CategoryContext';
import { postCategory, updateCategory } from '../api/category';
import { useSubscription } from '../contexts/SubscriptionContext';
import { setUpEventPayment, updateEventPayment } from '../api/subscriptionFee';

interface FeemodelProp {

    onClose?: any;
    formData?: any
}

const EventFeeModel: React.FC<FeemodelProp> = ({ onClose, formData }) => {
    console.log(formData);
    const { handleLoading } = useSubscription();
    const [formdata, setFormdata] = useState<any>({
        fee: ""
    });
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if(formData != null){
            updateEventPayment(formdata, handleLoading);
        }else{
            setUpEventPayment(formData, handleLoading);
        }
        onClose(false)
    }
    useEffect(()=>{
        setFormdata(() => ({
            fee: formData,
        }));
    },[formData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        console.log(value)
        setFormdata((prev: any) => ({
            ...prev,
            fee: Number(value),
        }));
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-md w-full max-w-lg p-6 relative">
                <button
                    className="absolute top-2 right-2 text-black"
                    onClick={
                        () => {
                          onClose(false)
                        }}

                >
                    <span className=' px-[14px] py-[9px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-center text-white rounded-full'>
                        &times;
                    </span>
                </button>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-black font-bold py-4 text-center text-2xl">Add New Event Fee</h2>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-black">Label Name</label>
                        <input
                            type="number"
                            onChange={handleChange}
                            className="border-2 border-solid border-gray-300 w-full p-2 rounded-md text-black"
                            placeholder="550"
                            value={formdata.fee}
                            required

                        />
                    </div>
                    <button
                        type="submit"
                        className="text-white my-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        Add Fee
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EventFeeModel;