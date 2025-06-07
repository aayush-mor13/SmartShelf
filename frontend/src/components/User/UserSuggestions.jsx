import React,{useState,useEffect} from 'react';
import axios from 'axios';

function UserSuggestions() {
    
    const [sBooks,setSBooks] = useState([]);

    useEffect(()=>{
        const fetchUserAndBooks = async () =>{
            const token = localStorage.getItem("token");
            if(token){
                try{
                    const user = await axios.get('http://localhost:5000/api/user/details', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const username = user.data.username;
                    
                    const response = await axios.get(`http://localhost:5000/api/suggestedbooks/user/${username}`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                    });
                    setSBooks(response.data);
                }
                catch(err){
                    console.error("Error fetching details !",err);
                }
            }
    }
        fetchUserAndBooks();
    },[]);
    
  return (
  
  <div className='w-dvh flex flex-col justify-center items-center'>
    <h1 className='text-2xl mt-12 font-bold mb-12'>Your Suggestions</h1>
    <div className='rounded-lg min-w-6xl mb-12 bg-neutral-100 p-8'>
        {sBooks.length === 0 ? (
            <p className='text-center text-gray-500 text-xl pt-4'>No suggestions found.</p>
        ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl bg-neutral-100 p-4'>
            {sBooks.map((book) => (
                <div key={book._id} className='w-full bg-white rounded-lg p-4 border-2 border-gray-700 min-w-[300px] min-h-[100px]'>
                    <h1 className='text-xl'>Title : {book.title}</h1>
                    <h3 className='text-md'>Author : {book.author ? book.author: "-"}</h3>
                    <h3 className='text-sm'>Date : {book.date ? new Date(book.date).toLocaleDateString('en-Us',{
                        year : 'numeric',
                        month : 'long',
                        day : 'numeric'
                    }) : "-"}</h3>
                    <h3 className='text-sm'>Status : {book.status ? book.status : "-"}</h3>
                </div>
            ))}
       </div>
        )
    }
    </div>
  </div>
  )
}

export default UserSuggestions
