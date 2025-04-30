import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import EventTable from '../components/Tables/EventTable';
import Pagination from '../components/Pagination/pagination';
import { eventContextStore } from '../contexts/EventContext';
import { useState } from 'react';

const Events = () => {
  const { eventsCount, handlePageChange, handlePageSize } = eventContextStore();
  const totalPages = Math.ceil(eventsCount / 10); 
  const [currentPage, setCurrentPage] = useState(1);
  const onPageChange = (pageNumber:any) => {
    setCurrentPage(pageNumber); 
    handlePageChange(pageNumber); 
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Events" />

      <div className="flex flex-col gap-10">
      
        <EventTable />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          pageSize={handlePageSize}
          isPreviousDisabled={currentPage === 1}
          isNextDisabled={currentPage === totalPages}
        />
      </div>
    </DefaultLayout>
  );
};

export default Events;
