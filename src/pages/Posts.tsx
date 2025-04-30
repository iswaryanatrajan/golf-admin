import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import PostTable from '../components/Tables/PostTable';

const Tables = () => {
  return (

    <DefaultLayout>
      <Breadcrumb pageName="Posts" />

      <div className="flex flex-col gap-10">
        <PostTable />
      </div>
    </DefaultLayout>
  );
};

export default Tables;
