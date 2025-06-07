import {Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Home from './components/Home/Home';
import AddBook from './components/Add Book/AddBook';
import EditBook from './components/Edit Book/EditBook';
import Footer from './components/Layout/Footer';
import GenrePage from './components/Genrewise Books/GenrePage';
import GenreSearch from './components/Genrewise Books/GenreSearch';
import DeleteBooks from './components/Delete Book/DeleteBooks';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './components/Admin Dashboard/Dashboard';
import AddSuggestedBook from './components/Admin Dashboard/AddSuggestedBook';
import UserSuggestions from './components/User/UserSuggestions';

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
