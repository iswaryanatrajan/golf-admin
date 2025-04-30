import React, { useEffect, useState } from 'react';
import { updateTeacher } from '../api/Teacher';
import { useCategory } from '../contexts/CategoryContext';
import { postCategory, updateCategory } from '../api/category';

interface AddCategoryProp {

  onClose: any;
  formData: any
}

const AddCategory: React.FC<AddCategoryProp> = ({ onClose, formData }) => {
  const { handleLoading } = useCategory();
  const [formdata, setFormdata] = useState<any>(null);



  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value)
    setFormdata((prev: any) => ({
      ...prev,
      categoryName: value,
    }));
    console.log(formdata)
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData?.id) {
      updateCategory(formData.id, formdata.categoryName, handleLoading)
    } else {
      postCategory(formdata, handleLoading);

    }
    onClose(false);


  };
  console.log(formdata, "formadata")
  useEffect(() => {
    setFormdata(() => ({
      categoryName: formData.categoryName,
    }));
  }, [formData])
  return (
    <div className="fixed relative inset-0 flex items-center justify-center z-50 sajid">
      <button
        className="absolute top-2 right-2 text-black hover:text-black "
        onClick={
          () => {
            onClose(false)
          }}
      >
        <span className='w-10 h-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium   w-full sm:w-auto  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 py-2 px-3 text-white rounded-full'>
          &times;
        </span>

      </button>
      <div className=" rounded-md w-[600px] px-4 py-10 rounded-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-black font-bold py-4 text-center text-[24px]">Add New Label</h2>

          <div>
            <label className="block mb-2 text-sm font-medium text-black ">Label Name</label>
            <input
              onChange={onInputChange}
              value={formdata?.categoryName}
              type="text"
              id="category_name"
              className="border-2 border-solid border-[#cccccc] w-full p-2 rounded-md text-black"
              placeholder="Developer"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white my-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add New Label
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
