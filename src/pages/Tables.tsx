import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import TeacherTable from '../components/Tables/TeacherTable';

const Tables = () => {
  
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Teachers" />

      <div className="flex flex-col gap-10">
        <TeacherTable />
      </div>
    </DefaultLayout>
  );
};

export default Tables;
