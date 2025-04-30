import React, { useState, useEffect, useRef } from 'react';
import { useCategory } from '../contexts/CategoryContext';
import { putCategories, unassignCategories } from '../api/category';
import '../css/style.css';
import Loader from '../common/Loader';

interface AssignCategoryProp {
  userId: string;
  isOpen: any;
  onClose: any;
}

const AssignCategory: React.FC<AssignCategoryProp> = ({
  userId,
  isOpen,
  onClose,
}) => {
  const { handleCategoryFormData, handleLoading, loading, categories } =
    useCategory();

  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCheckboxChange = async (e: any) => {
    const { value, checked } = e.target;

    if (selectedNames.length >= 0 && checked) {
      putCategories({ categoryIds: [value] }, userId, handleLoading);
    } else {
      setSelectedNames((prev) => prev.filter((name) => name !== value));
      await unassignCategories({ categoryIds: [value] }, userId, handleLoading);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await putCategories({ categoryIds: selectedNames }, userId, handleLoading);
    onClose();
  };

  useEffect(() => {
    const userCategories = categories.filter((category: any) =>
      category.users.some((user: any) => user.id === userId),
    );
    const userCategoryIds = userCategories.map((category: any) =>
      String(category.id),
    );
    setSelectedNames(userCategoryIds);
  }, [categories, userId]);

  useEffect(() => {
    if (dropdownOpen) {
      const dropdownHeight =
        modalRef.current?.querySelector('.dropdown-content')?.clientHeight || 0;
      modalRef.current!.style.height = `${200 + dropdownHeight}px`;
    } else {
      modalRef.current!.style.height = '300px';
    }
  }, [dropdownOpen]);

  if (!isOpen) return null;

  return loading ? (
    <div className="fixed inset-0 bg-transparent flex justify-center items-center z-[9999]">
  <div
        ref={modalRef}
        className="modal-content bg-white shadow-lg rounded-md w-[600px] px-4 relative"
      >
    <Loader className="h-[300px] bg-transparent" />
    </div>
    </div>
  ) : (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-[9999]">
      <div
        ref={modalRef}
        className="modal-content bg-white shadow-lg rounded-md w-[600px] px-4 relative"
      >
        <button
          className="absolute top-10 right-2 text-black hover:text-black"
          onClick={onClose}
        >
          <span className="w-10 h-10 bg-blue-700 hover:bg-blue-800 px-[13px] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium w-full sm:w-auto text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 py-2 px-3 text-white rounded-full">
            &times;
          </span>
        </button>
        <div className="rounded-md mt-20">
          <form onSubmit={handleSubmit}>
            <h2 className="text-black font-bold py-2">
              You can Assign Labels to this user
            </h2>
            <div className="relative inline-block text-left w-full">
              <button
                type="button"
                className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Select Categories
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="dropdown-content mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1 max-h-40 overflow-y-auto custom-scrollbar"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {categories.map((item: any) => (
                      <label
                        key={item.id}
                        className="flex items-center px-4 py-2 text-sm text-black"
                      >
                        <input
                          type="checkbox"
                          value={item.id}
                          checked={selectedNames.includes(item.id.toString())}
                          onChange={handleCheckboxChange}
                          className="mr-2 h-4 w-4 text-black border-gray-300 rounded"
                        />
                        {item.categoryName}
                      </label>
                    ))}
                  </div>
                  {/* {!(selectedNames.length > 0) && (
                    <div className="flex justify-center my-6 p-4">
                      <button
                        className="bg-blue-700 text-white rounded-md p-2"
                        type="submit"
                      >
                        Assign Label
                      </button>
                    </div>
                  )} */}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssignCategory;
