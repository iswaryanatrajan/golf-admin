import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Login from './pages/Authentication/Login';
import Posts from './pages/Posts';
import { useAuth } from './contexts/AuthContext';
import Teachers from './pages/Teachers';
import Events from './pages/Events';
import Users from './pages/Users';
import CommunityMembers from './pages/CommunityMembers';
import UpdatePost from './pages/UpdatePost';
import CourseSettings from './pages/CourseSettings';
import { Toaster } from 'react-hot-toast';

import { CategoryProvider } from './contexts/CategoryContext';

function App() {

  const { isLoading, hastoken } = useAuth();

  console.log(hastoken, "token")
  

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (isLoading) {
    return <Loader />
  }
  return (

    <>
      {hastoken ? (<Routes>
        <Route
          index
          element={
            <>
              <PageTitle title=" Dashboard | Golf" />
              <Users />

            </>
          }
        />
        <Route
          path="/analytics"
          element={
            <>
              <PageTitle title=" Analytics | Golf" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/events"
          element={
            <>
              <PageTitle title="Events | Golf" />
              <Events />
            </>
          }
        />
         <Route
          path="/course-settings"
          element={
            <>
              <PageTitle title="CourseSettings | Golf" />
              <CourseSettings />
            </>
          }
        />
        

        <Route
          path="/inbox"
          element={
            <>
              <PageTitle title="Inbox Messages | Golf" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | Golf" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/contacts"
          element={
            <>
              <PageTitle title="Contacts | Golf" />
              <Tables />
            </>
          }
        />
        <Route
          path="/posts"
          element={
            <>
              <PageTitle title="Posts | Golf" />
              <Posts />
            </>
          }
        />
        <Route
          path="/update-post/:id"
          element={
            <>
              <PageTitle title="Posts | Golf" />
              <UpdatePost />
            </>
          }
        />
        <Route
          path="/teachers"
          element={
            <>
              <PageTitle title="Teacher | Golf" />
              <Teachers />
            </>
          }
        />
        <Route
          path="/students"
          element={
            <>
              <PageTitle title="Student | Golf" />
              <Users />
            </>
          }
        />
         <Route
          path="/communitymembers"
          element={
            <>
              <PageTitle title="Members | Golf" />
              <CommunityMembers />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Edit Profile | Golf" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | Golf" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | Golf" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | Golf" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <PageTitle title="Login | Golf" />
              <Login />
            </>
          }
        />
       
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | Golf" />
              <SignIn />
            </>
          }
        />

        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | Golf" />
              <SignUp />
            </>
          }
        />
      </Routes>) :
        <Login />
      }
  <Toaster position="top-right" reverseOrder={false}  toastOptions={{
    success: {
      style: {
        background: 'green',
        color: 'white',
      },
    },
    error: {
      style: {
        background: 'red',
        color: 'white',
      },
    },
  }} />
    </>
  )
}


export default App;
