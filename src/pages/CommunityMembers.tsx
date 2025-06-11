import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../layout/DefaultLayout";
import MemberTable from '../components/Tables/MemberTable';
import Pagination from "../components/Pagination/pagination";
import { membersContextStore } from "../contexts/MembersContext"; // Ensure correct import


const Table = () => {
  const { membersCount, handlePageChange, handlePageSize } = membersContextStore(); // Default to an empty array

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
    ...Array(0).fill(true), // Placeholder for events
  ]);
  const [nonEmptyFilters, setNonEmptyFilters] = useState([...Array(12).fill(false)]); // Static columns + events
  const totalPages = Math.ceil(membersCount / 10); 
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (pageNumber:any) => {
    setCurrentPage(pageNumber); 
    handlePageChange(pageNumber); 
  };
  /*const setCount = (count) => {
    console.log("Count updated:", count);
  };

  const setMembers = (updatedMembers) => {
    console.log("Members updated:", updatedMembers);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchMembers(
      (updatedMembers: any) => {
        handlePageChange(1); // Reset page to 1
        setMembers(updatedMembers); // Update context's members
      },
      (count: number) => {
        console.log("Count updated:", count); // Pass a valid function for setCount
      },
      token,
      currentPage,
      pageSize
    );
  }, [currentPage, pageSize]); */

/*  const toggleColumn = (index) => {
    if (index === 0 || index === 1) return; // ID and Name are always visible
    const newState = [...visibleColumns];
    newState[index] = !newState[index];
    setVisibleColumns(newState);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditModalVisible(true);
  };

  const handleDeleteClick = async (memberId) => {
    const confirmed = window.confirm(`Are you sure you want to delete this member '${memberId}'?`);
    if (confirmed) {
      await deleteMember(memberId, () => {});
      handlePageChange(1); // Refresh the list
    }
  };

  const handleEditSubmit = async (updatedUser) => {
    const success = await updateMember(updatedUser);
    if (success) {
      alert("Member details updated successfully!");
      setEditModalVisible(false);
      handlePageChange(1); // Refresh the list
    } else {
      alert("Failed to update member.");
    }
  };*/
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Members" />
<MemberTable></MemberTable>
      <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              pageSize={handlePageSize}
              isPreviousDisabled={currentPage === 1}
              isNextDisabled={currentPage === Math.ceil(membersCount / 10)}
            />

    </DefaultLayout>
  );
};

export default Table;
