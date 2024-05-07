import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Home from './components/pages/Home';
import UpdateUserRole from './components/auth/UpdateUserRole';
import Organization from './components/admin/Organization';
import OrganizationsList from './components/admin/OrganizationsList';
import OrganizationDetails from './components/admin/OrganizationDetails';
import CheckUserStatus from './components/pages/CheckUserStatus';
import SchoolHomePage from './components/pages/school/SchoolHomePage';
import TeacherPage from './components/pages/school/TeacherPage';
import NonTeacherPage from './components/pages/school/NonTeacherPage';
import ParentPage from './components/pages/school/ParentPage';
import HomeContainer from './components/pages/HomePages/HomeContainer';
import StudentsList from './components/pages/school/StudentsList';
import AddStudentsCA from './components/pages/school/AddStudentsCA';
import ShowStudentsResults from './components/pages/school/ShowStudentsResults';

const App: React.FC = () => {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/add-role-to-user" element={<UpdateUserRole />} />
          <Route path='/show-admin-organizations' element={<Organization />} />
          <Route path='/show-all-organizations' element={<OrganizationsList />} />
          <Route path='/organization-details/:organizationId' element={<OrganizationDetails />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/check-user-status' element={<CheckUserStatus />} />
          <Route path='/school-home-page/:schoolId' element={<Home />}>
            <Route index element={<SchoolHomePage />} />
            <Route path='teacher-details' element={<TeacherPage />} />
            <Route path='non-teacher-details' element={<NonTeacherPage />} />
            <Route path='parent-details' element={<ParentPage />} />
            <Route path='students-in-class-arm' element={<StudentsList />} />
            <Route path='add-student-ca' element={<AddStudentsCA />} />
            <Route path='get-students-result' element={<ShowStudentsResults />} />
          </Route>
        </Routes>
        <ToastContainer theme="dark" />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;