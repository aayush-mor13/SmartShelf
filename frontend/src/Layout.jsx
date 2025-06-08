import {Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/home/Home';
import AddBook from './components/addBook/AddBook';
import EditBook from './components/editBook/EditBook';
import Footer from './components/layout/Footer';
import GenrePage from './components/genrewiseBooks/GenrePage';
import GenreSearch from './components/genrewiseBooks/GenreSearch';
import DeleteBooks from './components/deleteBook/DeleteBooks';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/adminDashboard/Dashboard';
import AddSuggestedBook from './components/adminDashboard/AddSuggestedBook';
import UserSuggestions from './components/user/UserSuggestions';

function Layout() {
  const location = useLocation();
  const hide = location.pathname === '/login' || location.pathname === '/register';
  return (
    <>
      {!hide && <Navbar/>}
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/suggestedbooks/approved' element={<AddSuggestedBook/>}/>
        <Route path='/suggestions' element={<UserSuggestions/>}/>
        <Route path='/add' element={<AddBook/>}/>
        <Route path='/edit' element={<EditBook/>}/>
        <Route path='/delete' element={<DeleteBooks/>}/>
        <Route path='/genre' element={<GenreSearch/>}/>
        <Route path='/genre/:genre' element={<GenrePage/>}/>
      </Routes>
      {!hide && <Footer/>}
    </>
  );
}

export default Layout;
