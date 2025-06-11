import React, { useCallback, useEffect, useState } from "react";
import { fetchMembers } from "../api/Members";

const MembersCreateContext = React.createContext<any>({});

export const MembersContext = ({ children }: any) => {
  const [members, setMembers] = useState<any[]>([]); // Initialize as an empty array
  const store_token: string = localStorage.getItem("token") || "";
  const [membersCount, setMembersCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    console.log("Fetching members...");
    setLoading(true);
    fetchMembers(setMembers, setMembersCount, store_token, currentPage, pageSize)
      .then(() => {
        console.log("Members fetched successfully:", members);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, pageSize]);



    const handleMembers = useCallback((value: any) => {
          return setMembers(value);
      }, [members]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSize = (size: number) => {
    setPageSize(size);
  };

  const value = { handleMembers, members, membersCount, currentPage, pageSize, handlePageChange, handlePageSize, loading };

  return (
    <MembersCreateContext.Provider value={value}>
      {children}
    </MembersCreateContext.Provider>
  );
};

export const membersContextStore = () => React.useContext(MembersCreateContext);