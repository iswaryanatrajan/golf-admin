import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/apiConfig";
import {  MembersContext,membersContextStore } from "../../contexts/MembersContext"; // Ensure correct import
import { deleteMember, updateMember, fetchMembers } from "../../api/Members";
import { FaPen, FaTrash } from "react-icons/fa";

const MemberTable = () => {
  const { members =[],  loading } = membersContextStore(); // Default to an empty array
  
  const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [visibleColumns, setVisibleColumns] = useState([
      true, // ID (always visible)
      true, // Name (always visible)
      true, // 活動地域_海外
      true, // 平均スコア
      true, // 性別
      true, // メールアドレス
      true, // 電話番号
      true, // フリガナ
      true, // 活動地域
      true, // 顔写真
      true, // 名刺
      true, // お名前
     // ...Array(0).fill(true), // Placeholder for events
    ]);
    const [filterIndex, setFilterIndex] = useState(null);
    /*
      const [visibleColumns, setVisibleColumns] = useState([
    true, // ID (always visible)
    true, // Name (always visible)
    true, // 活動地域_海外
    true, // 平均スコア
    true, // 性別
    true, // メールアドレス
    true, // 電話番号
    true, // フリガナ
    true, // 活動地域
    true, // 顔写真
    true, // 名刺
    true, // お名前
    ...events.map(() => true), // Event columns
  ]);
  const [columnFilters, setColumnFilters] = useState([
      "", // ID (no filter)
      "", // Name (no filter)
      "", // 活動地域_海外
      "", // 平均スコア
      "", // 性別
      "", // メールアドレス
      "", // 電話番号
      "", // フリガナ
      "", // 活動地域
      "", // 顔写真
      "", // 名刺
      "", // お名前
      ...events?.map(() => ""), // Event columns
    ]);
    const [nonEmptyFilters, setNonEmptyFilters] = useState([
      false, // ID (no filter)
      false, // Name (no filter)
      ...Array(10).fill(false), // Static columns
      ...events?.map(() => false), // Event columns
    ]);*/
    const [nonEmptyFilters, setNonEmptyFilters] = useState([...Array(12).fill(false)]); // Static columns + events
    const [filteredUsers, setFilteredUsers] = useState([]); // Define filteredUsers state
    //const [eventColumnFilters, setEventColumnFilters] = useState(events.map(() => "all"));
    const [users, setUsers] = useState([]); 
    const [uploading, setUploading] = useState(false);
    //const totalPages = Math.ceil(membersCount / 10); 
    const [refreshing, setRefreshing] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [count, setCount] = useState(0);
    const [localMembers, setLocalMembers] = useState(members); // local state for live update
    const [currentPage, setCurrentPage] = useState(1);


 const token = localStorage.getItem("admin_token");

  useEffect(() => {
   
   fetchMembers(setLocalMembers, setCount, token, pageNumber, pageSize);
    console.log(localMembers, "localmembers");
    console.log(members, "members");
  }, [refreshing]);

  useEffect(() => {
    const applyFilters = () => {
      const filtered = localMembers.filter((user: any) => {
        // Check static columns
        const staticColumns = [
          user.activityRegionAbroad,
          user.averageScore,
          user.gender,
          user.email,
          user.phone,
          user.furigana,
          user.activityRegion,
          user.photo,
          user.businessCard,
          user.displayName,
          user.fullName,
        ];

        for (let i = 0; i < staticColumns.length; i++) {
          // Apply non-empty filter
          if (nonEmptyFilters[i + 2] && !staticColumns[i]) {
            return false;
          }
        }

        // Check event columns
        for (let i = 0; i < user.events?.length; i++) {
          if (nonEmptyFilters[i + 12] && String(user.events[i]) !== nonEmptyFilters[i + 12]) {
            return false;
          }
        }

        return true;
      });

      setFilteredUsers(filtered);
      console.log("Filtered users:", filtered);
    };

    applyFilters();
  }, [localMembers, nonEmptyFilters]); // Update filteredUsers whenever members or filters change

  const handleEditClick = (user) => {
    console.log("Editing user:", user);
    setSelectedUser(user);
    setEditModalVisible(true);
  };

  const handleDeleteClick = async (memberId) => {
    const confirmed = window.confirm(`Are you sure you want to delete this member '${memberId}'?`);
    if (confirmed) {
      await deleteMember(memberId, () => {});
      handleRefresh();
    }
  };
  const handleRefresh = () => {
    //setFilteredUsers([]); // Clear filtered users temporarily
    setRefreshing((prev) => !prev); // Trigger re-fetch
  };

  const handleEditSubmit = async (updatedUser) => {
    const success = await updateMember(updatedUser);
    if (success) {
      alert("Member details updated successfully!");
      setEditModalVisible(false);
      handleRefresh();
    } else {
      alert("Failed to update member.");
    }
  };


  const toggleColumn = (index : any) => {
    if (index === 0 || index === 1) return;

    const newState = [...visibleColumns];
    newState[index] = !newState[index];
    setVisibleColumns(newState);
  };

  const handleFileUpload = (userId, file) => {
    console.log(`File uploaded for user ${userId}:`, file);
    // Add logic to handle file upload (e.g., API call)
  };

  const handleClientDataUpload = async (file) => {
    const token = localStorage.getItem("admin_token");
    const formData = new FormData();
    formData.append("file", file);

    console.log("Uploading file:", file);
    console.log("Token:", token);
    try {
      setUploading(true);
      const response = await axios.post(`${API_ENDPOINTS.UPLOADCOMMUNITYMEMBERS}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully:", response.data);
      alert("Client data uploaded successfully!");
    } catch (error) {
      console.error("Error uploading client data:", error);
      alert("Failed to upload client data.");
    } finally {
      setUploading(false);
    }
  }; 

/*  const filteredUsers = members.filter((user:any) => {
    // Check static columns
    const staticColumns = [
      user.activityRegionAbroad,
      user.averageScore,
      user.gender,
      user.email,
      user.phone,
      user.furigana,
      user.activityRegion,
      user.photo,
      user.businessCard,
      user.displayName,
      user.fullName
    ];

    for (let i = 0; i < staticColumns.length; i++) {
      // Apply non-empty filter
      if (nonEmptyFilters[i + 2] && !staticColumns[i]) {
        return false;
      }
    }

    // Check event columns
    for (let i = 0; i < user.events?.length; i++) {
      if (columnFilters[i + 12] && String(user.events[i]) !== columnFilters[i + 12]) {
        return false;
      }
    }

    return true;
  });*/
  return (
   
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-col gap-10">
          <div className="flex gap-2 items-center">
          <label className="text-white bg-primary p-2 rounded-md cursor-pointer">
              Upload client data
              <input
                type="file"
                accept=".csv"
                onChange={(e) => handleClientDataUpload(e.target.files[0])}
                className="hidden"
                disabled={uploading}
              />
            </label>
            <button className="text-white bg-primary p-2 rounded-md">Upload event joined history</button>
            <button className="text-white bg-primary p-2 rounded-md">Download page data</button>
          </div>
          <div className="p-4 space-y-6">
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <div className="overflow-x-auto rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark rounded-md">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                      {visibleColumns.map((isVisible, index) => {
                        if (index === 0 || index === 1) return null; // Skip ID and Name
                        if (!isVisible) {
                          const columnName = [
                            "活動地域_海外",
                            "平均スコア",
                            "性別",
                            "メールアドレス",
                            "電話番号",
                            "フリガナ",
                            "活動地域",
                            "顔写真",
                            "名刺",
                            "お名前",
                          ][index - 2] || `Event ${index - 12 + 1}`; // Static columns + events
                          return (
                            <th key={index} className="px-2 py-1 text-center">
                              <label className="flex flex-col items-center space-y-1 text-xs">
                                <span>{columnName}</span>
                                <input
                                  type="checkbox"
                                  checked={isVisible}
                                  onChange={() => toggleColumn(index)}
                                  className="cursor-pointer"
                                />
                              </label>
                            </th>
                          );
                        }
                        return null;
                      })}
                    </tr>
                  </thead>
                  <thead className="bg-[#5f6cb8] text-left dark:bg-meta-4 text-white">
                    <tr>
                      <th className="px-2 py-1">ID</th>
                      <th className="px-2 py-1 whitespace-nowrap">表示名</th>
                      {[
                        "活動地域_海外",
                        "平均スコア",
                        "性別",
                        "メールアドレス",
                        "電話番号",
                        "フリガナ",
                        "活動地域",
                        "顔写真",
                        "名刺",
                        "お名前",
                      ].map((columnName, index) =>
                        visibleColumns[index + 2] ? (
                          <th key={index + 2} className="px-2 py-1 whitespace-nowrap break-words">
                            <div className="flex flex-col items-center">
                              <span>{columnName}</span>
                              <label className="flex items-center space-x-1 text-xs mt-1">
                                <input
                                  type="checkbox"
                                  checked={visibleColumns[index + 2]} // Adjust index for columns after Name
                                  onChange={() => toggleColumn(index + 2)}
                                />
                              </label>
                              <button
                                onClick={() => {
                                  const newFilters = [...nonEmptyFilters];
                                  newFilters[index + 2] = !nonEmptyFilters[index + 2];
                                  setNonEmptyFilters(newFilters);
                                }}
                                className={`mt-1 text-xs px-2 py-1 border rounded ${
                                  nonEmptyFilters[index + 2] ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                                }`}
                              >
                                {nonEmptyFilters[index + 2] ? "非空" : "全て"}
                              </button>
                            </div>
                          </th>
                        ) : null
                      )}
                      <th className="px-2 py-1">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                     {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={12} className="text-center py-4 border-b border-[#eee] dark:border-strokedark">
                          該当する参加者がいません。
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50">
                          <td className="px-2 py-1 border-b border-[#eee] dark:border-strokedark">{user.id}</td>
                          <td className="px-2 py-1 border-b border-[#eee] dark:border-strokedark">{user.displayName}</td>
                          {[
                            user.activityRegionAbroad,
                            user.averageScore,
                            user.gender,
                            user.email,
                            user.phone,
                            user.furigana,
                            user.activityRegion,
                            user.photo,
                            user.businessCard,
                            user.fullName,
                          ].map((value, index) =>
                            visibleColumns[index + 2] ? (
                              <td key={index + 2} className="px-2 py-1 border-b border-[#eee] dark:border-strokedark">
                                {index === 0 ? ( // 活動地域_海外 column
                              <div className="flex flex-col items-center">
                                {/* <span>{value}</span> */}
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleFileUpload(user.id, e.target.files[0])
                                  }
                                  className="mt-1 text-xs"
                                />
                              </div>
                            ) : (
                              value
                            )}
                              </td>
                            ) : null
                          )}
                          <td className="px-2 py-1 border-b border-[#eee] dark:border-strokedark text-center">
                            <button onClick={() => handleEditClick(user)} aria-label="Edit">
                              <FaPen style={{ color: "#5f6cb8" }} />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(user.id)}
                              className="text-red-500 hover:underline ml-2"
                              aria-label="Delete"
                            >
                              <FaTrash style={{ color: "#5f6cb8" }} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </div>
        {editModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg overflow-y-auto" style={{ maxHeight: "70vh" }}>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold">Edit User</h1>
              <button
                onClick={() => setEditModalVisible(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const updatedUser = {
                  ...selectedUser,
                  displayName: e.target.displayName.value,
                  email: e.target.email.value,
                  phone: e.target.phone.value,
                  activityRegionAbroad: e.target.activityRegionAbroad.value,
                  averageScore: e.target.averageScore.value,
                  furigana: e.target.furigana.value,
                  activityRegion: e.target.activityRegion.value,
                  photo: e.target.photo.files[0],
                  businessCard: e.target.businessCard.value,
                  fullName: e.target.fullName.value,
                };
                await handleEditSubmit(updatedUser);
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Display Name</label>
                <input
                  type="text"
                  name="displayName"
                  defaultValue={selectedUser?.displayName}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={selectedUser?.email}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={selectedUser?.phone}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Activity Region Abroad</label>
                <input
                  type="text"
                  name="activityRegionAbroad"
                  defaultValue={selectedUser?.activityRegionAbroad}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Average Score</label>
                <input
                  type="text"
                  name="averageScore"
                  defaultValue={selectedUser?.averageScore}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Furigana</label>
                <input
                  type="text"
                  name="furigana"
                  defaultValue={selectedUser?.furigana}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Activity Region</label>
                <input
                  type="text"
                  name="activityRegion"
                  defaultValue={selectedUser?.activityRegion}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Photo</label>
                <input
                  type="file"
                  name="photo"
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Business Card</label>
                <input
                  type="text"
                  name="businessCard"
                  defaultValue={selectedUser?.businessCard}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  defaultValue={selectedUser?.fullName}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditModalVisible(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
     
      </div>
  )
    };


export default MemberTable;
