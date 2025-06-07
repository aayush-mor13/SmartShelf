import React,{useState,useEffect} from 'react'
import axios from 'axios';
import ManageGenre from './ManageGenre';
import ManageSuggestions from './ManageSuggestions';
import ManageAdmin from './ManageAdmin';

function Dashboard() {
    
  
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [username, setUsername] = useState('');

    const [books,setBooks] = useState(0);
    const [suggestedBooks, setSuggestedBooks] = useState(0);
    const [users,setUsers] = useState(0);
    const [genres,setGenres] = useState(0);

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    useEffect(()=>{
        if(!token && !role){
            setIsAuthorized(false);
            return;
        }
        try{
            if(token && role === 'admin'){
                setIsAuthorized(true);
            }
            else{
                setIsAuthorized(false);
            }
        }
        catch(err){
            setIsAuthorized(false);
        }
    },[role,token]);

    useEffect(() => {
      const fetchUser = async () => {
      try {
        if (isAuthorized) {
          const response = await axios.get('http://localhost:5000/api/admin', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUsername(response.data.username);
        }
      }
      catch (err){
        console.error("Error fetching admin data:", err);
      }
    };
    fetchUser();
    }, [isAuthorized]);

    useEffect(()=>{
    const fetchDetails = async ()=>{
      if(isAuthorized){
        try{
          const booksRes = await axios.get('http://localhost:5000/api/books');
          setBooks(booksRes.data.length);
        }
        catch(err){
          console.error("Error fetching books:", err);
        }
        try{
          const genresRes = await axios.get('http://localhost:5000/api/genres');
            setGenres(genresRes.data.length);
        }
        catch(err){
          console.error("Error fetching genres:", err);
        }
        try{
          const suggestedBooksRes = await axios.get('http://localhost:5000/api/suggestedbooks', {
            headers: { 
              Authorization: `Bearer ${token}` 
            }
          });
          setSuggestedBooks(suggestedBooksRes.data.length);
        }
        catch(err){
          console.error("Error fetching suggested books:", err);
        }
        try {
          const usersRes = await axios.get('http://localhost:5000/api/users', {
            headers: { 
              Authorization: `Bearer ${token}`
            }
          });
          setUsers(usersRes.data.length);
        }
        catch(err){
          console.error("Error fetching users:", err);
        }
      }
    }
    fetchDetails();
    },[isAuthorized,token,users,suggestedBooks,genres]);
    
    if(!isAuthorized){
    return (
      <div className='flex justify-center items-center'>
        <h2 className='text-3xl mt-8 font-bold text-red-500'>
          You are not authorized to view this page. Access Denied !
        </h2>
      </div>
    )
  }

  return (
    <div className='w-dvw flex flex-col justify-center items-center gap-12'>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-3xl font-bold m-12'>Welcome back, {username} !</h1>
        <h3 className='text-2xl font-bold mb-12'>Dashboard Metrics</h3>
        <div className='flex gap-12'>
          <div className='w-36 h-36 bg-blue-500 p-4 font-bold flex flex-col justify-evenly items-center rounded-xl shadow-lg hover:scale-105 transition-transform'>
            <span className='text-white text-xl mb-4'>Users</span>
            <span className='text-white text-3xl'>{users}</span>
          </div>
          <div className='w-40 bg-blue-500 p-4 font-bold flex flex-col justify-evenly items-center rounded-xl shadow-lg hover:scale-105 transition-transform'>
            <span className='text-white text-xl mb-4'>Books</span>
            <span className='text-white text-3xl'>{books}</span>
          </div>
          <div className='w-40 bg-blue-500 p-4 font-bold flex flex-col justify-evenly items-center rounded-xl shadow-lg hover:scale-105 transition-transform'>
            <span className='text-white text-xl mb-4'>Genres</span>
            <span className='text-white text-3xl'>{genres}</span>
          </div>
          <div className='w-40 bg-blue-500 p-4 font-bold flex flex-col items-center rounded-xl shadow-lg hover:scale-105 transition-transform'>
            <span className='text-white text-xl mb-4 text-center'>Suggested Books</span>
            <span className='text-white text-3xl'>{suggestedBooks}</span>
          </div>
        </div>
        <div className="h-0.5 w-full bg-gray-200 shadow-lg rounded-md mt-12 mx-auto max-w-6xl" />
      </div>
      <div>
        <ManageGenre/>
        <div className="h-0.5 w-full bg-gray-200 shadow-lg rounded-md mt-12 mx-auto max-w-6xl" />
      </div>
      <div>
        <ManageSuggestions/>
        <div className="h-0.5 w-full bg-gray-200 shadow-lg rounded-md mt-12 mx-auto max-w-6xl" />
      </div>
      <div>
        <ManageAdmin/>
        <div className="h-0.5 w-full bg-gray-200 shadow-lg rounded-md mt-12 mx-auto max-w-6xl" />
      </div>
    </div>
  )
}

export default Dashboard
