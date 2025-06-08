import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function ManageSuggestions() {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [sBooks,setSBooks] = useState([]);
    const [status,setStatus] = useState('pending');

    useEffect(()=>{
        const fetchBooks = async () =>{
            try{
                const response = await axios.get(`http://localhost:5000/api/suggestedbooks/${status}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
                });
                setSBooks(response.data);
            }
            catch(err){
                console.error("Error fetching suggestions !");
            }
    }
        fetchBooks();
    },[status]);

    const handlePending=()=>{
        setStatus('pending');
    }
    const handleRejected=()=>{
        setStatus('rejected');
    }
    const handleAccepted=()=>{
        setStatus('accepted');
    }
    

    const handleApproveStatus=async (book)=>{
       navigate('/suggestedbooks/approved',{ state: { book }});
    }

    const handleRejectStatus= async(book)=>{
        try{
            await axios.put(`http://localhost:5000/api/suggestedbooks/${book._id}`,
                {status : 'rejected'},
                {
                    headers: { 
                        Authorization: `Bearer ${token}` 
                    }
                }
            )
            setSBooks(prevBooks => prevBooks.filter(b => b._id !== book._id));
        }
        catch(err){
            console.error("Error approving book status !",err);
        }
    }

    const handleDelete= async (id)=>{
        try{
            await axios.delete(`http://localhost:5000/api/suggestedbooks/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSBooks(prevBooks => prevBooks.filter(book => book._id !== id));
        }
        catch(err){
            console.log("Error occured while deleting suggestion !");
        }
    }
    
  return (
  
  <div className='w-dvh flex flex-col justify-center items-center'>
    <h1 className='text-2xl font-bold mb-12'>Manage Suggestions</h1>
    <div className='rounded-lg min-w-6xl mb-12 bg-neutral-100 p-8'>
        <div className='flex gap-12 justify-center items-center'>
            <button 
            className={`border-2 rounded-md p-2 pl-4 pr-4 font-bold transition-colors ${status === 'pending' ? 'bg-blue-200 text-blue-900' : 'text-white bg-blue-500 hover:bg-white hover:text-blue-500'}`}
            onClick={handlePending}  
            >
              Pending
            </button>
            <button 
            className={`border-2 rounded-md p-2 pl-4 pr-4 font-bold transition-colors ${status === 'rejected' ? 'bg-blue-200 text-blue-900' : 'text-white bg-blue-500 hover:bg-white hover:text-blue-500'}`}
            onClick={handleRejected}  
            >
              Rejected
            </button>
            <button 
            className={`border-2 rounded-md p-2 pl-4 pr-4 font-bold transition-colors ${status === 'accepted' ? 'bg-blue-200 text-blue-900' : 'text-white bg-blue-500 hover:bg-white hover:text-blue-500'}`}
            onClick={handleAccepted}  
            >
              Accepted
            </button>
        </div>
        {sBooks.length === 0 ? (
            <p className='text-center text-gray-500 text-xl pt-4'>No {status} suggestions found.</p>
        ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl bg-neutral-100 p-4'>
            {sBooks.map((book) => (
                <div key={book._id} className='w-full bg-white rounded-lg p-4 border-2 border-gray-700 min-w-[300px] min-h-[160px]'>
                    <h1 className='text-xl'>Title : {book.title}</h1>
                    <h3 className='text-md'>Author : {book.author ? book.author: "-"}</h3>
                    <h3 className='text-sm'>By : {book.name ? book.name: "-"}</h3>
                    <h3 className='text-sm'>Email : {book.email ? book.email: "-"}</h3>
                    <h3 className='text-sm'>Notes : {book.notes ? book.notes: "-"}</h3>
                    <h3 className='text-sm'>Date : {book.date ? new Date(book.date).toLocaleDateString('en-Us',{
                        year : 'numeric',
                        month : 'long',
                        day : 'numeric'
                    }) : "-"}</h3>
                    {status==='pending' && <div className='flex justify-between px-8'>
                        <button 
                        className='text-green-500 font-semibold'
                        onClick={()=>handleApproveStatus(book)}
                        >
                            Approve
                        </button>
                        <button
                        className='text-red-500 font-semibold'
                        onClick={()=>handleRejectStatus(book)}
                        >
                            Reject
                        </button>
                    </div>}
                    {(status ==='rejected' || status === 'accepted') && (
                        <div className='flex justify-center'>
                            <button 
                            className='text-red-500 font-semibold'
                            onClick={()=>handleDelete(book._id)}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ))}
       </div>
        )
    }
    </div>
  </div>
  )
}

export default ManageSuggestions
