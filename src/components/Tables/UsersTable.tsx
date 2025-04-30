import { useEffect, useState } from 'react';
import { frontEnd } from '../../api/apiConfig';
import { allUsersStore } from '../../contexts/AllUsers';
import { useCategory } from '../../contexts/CategoryContext';
import AddCategory from '../AddCategory';
import AssignCategory from '../AssignCategory';
import { updateCategory } from '../../api/category';

interface Users {
  id: any;
  imageUrl: string;
  nickName: string;
  email: string;
  createdAt: any;
}

const UsersTable = () => {
  const { totalUsers } = allUsersStore();
  const { getCategories, categories, loading, handleDeleteCategory,handleLoading  } = useCategory();
  const [isModalOpens, setIsModalOpens] = useState(false);
  const [isModalsOpen, setIsModalsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [formData, setFormData] = useState({
    id:"",
    categoryName:""
  });
 

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const handleModel = (value: any) => {
    setIsModalOpens(value);
  };

  const handleLabelModel = (value: any) => {
    setIsModalsOpen(value);
    if (value) {
      getCategories();
    }
  };

  const handleButtonClick = (userId: any) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserId("");
  };

  const handleCloseModals = () => {
    setIsModalsOpen(false);
    setSelectedUserId("");
  };

  const handleUpdateModel= (category:any) => {
    const {id,categoryName} = category;
    // updateCategory(categoryId,newCategoryName,handleLoading);
    setFormData({id, categoryName});
    setIsModalOpens(true);

  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className='flex justify-between items-center'>
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          All Usersss
        </h4>
        <div className='flex gap-4'>
          <button onClick={() => handleLabelModel(true)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">See All Labels</button>
          <button onClick={() => handleModel(true)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Labels</button>
        </div>


      </div>


      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              NAME
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              EMAIL
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              STATUS
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Member Since
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              N.O OF POSTS
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>
        {isModalsOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-6 rounded shadow-lg z-10 w-[600px]">
              <div className='flex justify-end py-4'>
                <button onClick={handleCloseModals} className='text-[red]'>
                  <span className="w-10 h-10 bg-blue-700 hover:bg-blue-800 px-[13px] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium w-full sm:w-auto text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 py-2 px-3 text-white rounded-full">
                    &times;
                  </span>
                </button>
              </div>

              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className='max-h-80 overflow-y-auto custom-scrollbar'>
                  <ul className='flex flex-wrap gap-6'>
                  {categories.map((category: any) => {
                     return <li className='bg-black text-white rounded-md p-2 flex justify-between items-center' key={category.id}>
                        <span>{category.categoryName}</span>
                        <button onClick={() => handleUpdateModel(category)} className="text-yellow-500 hover:text-yellow-700 px-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-pencil"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 3.5L2.5 12.207V13.5h1.293L13.5 4.793 11.207 3.5zm1.586-1.586l-1-1L14.5 3.793l1 1-2.707-2.707zm-10.864 10.02l-.354.354-.647 1.616 1.616-.647.354-.354L2.93 11.934z" />
                          </svg>
                        </button>
                        <button onClick={() => handleDeleteCategory(category.id)} className="text-red-500 hover:text-red-700 px-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-trash"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v7a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2 0A.5.5 0 0 1 8 6v7a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3.5-.5a.5.5 0 0 0-1 0V6a.5.5 0 0 0 1 0V5zm-5-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H6V3zM4.5 1a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1h3a.5.5 0 0 1 0 1h-1v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3H2a.5.5 0 0 1 0-1h3V1z" />
                          </svg>
                        </button>
                      </li>
})}
                  </ul>
                </div>
              )}
              <div className='mt-4'>
                <button onClick={() => handleModel(true)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Add Label
                </button>
              </div>
            </div>
          </div>
        )}

        {isModalOpens && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-6 rounded shadow-lg z-10">
              <AddCategory onClose={handleModel} formData={formData} />
            </div>
          </div>
        )}
        {totalUsers?.users.map((user: Users, index: number) => {
          const userCategories = categories.filter((category: any) =>
            category.users.some((u: any) => u.id === user.id),
          );
          return (
            <div
              className={`grid grid-cols-3 sm:grid-cols-6 ${index === totalUsers.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
                }`}
              key={index}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="flex-shrink-0">
                  <img className='w-12 h-12 rounded-full' src={user.imageUrl || ''} alt="Brand" />
                </div>
                <p className="hidden text-black dark:text-white sm:block">
                  {user.nickName}s
                </p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{user.email}</p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">


                {userCategories.length > 0 ? (
                  <div className="flex flex-wrap justify-center items-center gap-2">
                    {userCategories.map((category: any) => (
                      <div className="p-2 bg-white text-black dark:bg-gray-800 rounded-md shadow-md m-1 flex items-center" key={category.id}>
                        <p className="mr-2">{category.categoryName}</p>
                      
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-black dark:text-white">No Category</p>
                )}


              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white"> {formatDate(user.createdAt)}</p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">10</p>
              </div>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <div className="flex items-center space-x-3.5">
                  <button
                    className="hover:text-primary relative group"
                    onClick={() => {
                      window.open(frontEnd + "user-page/" + user?.id, '_blank');
                    }}
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                        fill=""
                      />
                      <path
                        d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                        fill=""
                      />
                    </svg>
                    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full xl:w-[100px] mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded py-1 px-2 pointer-events-none">
                      View Details
                    </span>
                  </button>
                  <button
                    // onClick={() => {
                    //   handleDelete(item.id);
                    // }}
                    className="hover:text-primary"
                  >
                    <svg
                      className="fill-current"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                        fill=""
                      />
                      <path
                        d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                        fill=""
                      />
                      <path
                        d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                        fill=""
                      />
                      <path
                        d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                  <button className='hover:text-primary relative group' onClick={() => handleButtonClick(user.id)}
                  >

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-plus"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8V1.5a.5.5 0 0 1 1 0V8h6.5a.5.5 0 0 1 0 1H9v6.5a.5.5 0 0 1-1 0V9H1.5a.5.5 0 0 1 0-1H8z" />
                    </svg>
                    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 xl:w-[100px] opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded py-1 px-2 pointer-events-none">
                      Assign Label
                    </span>
                  </button>
                  {
                    isModalOpen && <AssignCategory isOpen={isModalOpen} onClose={handleCloseModal} userId={selectedUserId} />

                  }
                </div>
              </div>
            </div>

          )
        }
        )}
      </div>
    </div>
  );
};

export default UsersTable;
