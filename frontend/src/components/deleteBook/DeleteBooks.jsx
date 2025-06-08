import React,{useState, useEffect} from 'react';
import Card from '../home/Card';
import axios from 'axios';

function DeleteBooks() {

    const [isbnSearch,setIsbnSearch] = useState('');
    const [isIsbnCorrect, setIsIsbnCorrect] = useState(false);
    const [error,setError] = useState('');
    const [deleteMsg, setDeleteMsg] = useState('');
    const [book,setBook] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(false);

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

    const handleIsbnSubmit = async () => {
        if(!isbnSearch.trim()){
            setError('Please Enter ISBN !');
            setIsIsbnCorrect(false);
            setDeleteMsg('');
            return;
        }
        if(isNaN(isbnSearch)){
            setError('ISBN must be a number !');
            setIsIsbnCorrect(false);
            setDeleteMsg('');
            return;
        }
        
        try{
            const res = await axios.get('http://localhost:5000/api/books',{
                headers :{
                    Authorization : `Bearer ${token}`
                }
            });
            const books = res.data;

            const currBook = books.filter((book)=>book.isbn === Number(isbnSearch));
            if(currBook.length === 0){
                setError("No book Found !");
                setIsIsbnCorrect(false);
                setDeleteMsg('');
                return;
            }
            setError('');
            setBook(currBook[0]);
            console.log(currBook);
            setIsIsbnCorrect(true);
            setDeleteMsg('');
        }
        catch(err){
            console.error(err);
        }
    }

    const handleEnter = (e) => {
        if(e.key === 'Enter'){
            handleIsbnSubmit();
        }
    }

    const handleCancel = () => {
        setIsIsbnCorrect(false);
        setError('');
        setIsbnSearch('');
        setDeleteMsg('');
    }

    const handleDelete = async () => {
        try{
            await axios.delete(`http://localhost:5000/api/books/${isbnSearch}`,{
                headers :{
                    Authorization : `Bearer ${token}`
                }
            });
            setError('');
            setDeleteMsg(`The book with ISBN : ${isbnSearch} was successfully deleted !`);
            
            setTimeout(()=>{
                setDeleteMsg('');
            },3000);
            
            setIsbnSearch('');
            setIsIsbnCorrect(false);
        }
        catch(err){
            console.error("Error while deleting book details !");
            setError('Error while deleting book details !');
        }
    }

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
    <div>
        <h1 className='text-center text-3xl pt-12 font-bold'>Enter ISBN</h1>
        <div className='max-w-xl bg-neutral-100 mt-6 p-8 flex flex-col justify-center items-center mx-auto rounded-3xl shadow-lg'>
            <div className='flex flex-row gap-16'>
                <input 
                type="text"
                className='h-10 w-56 p-4 rounded-lg border-gray-200 border-2'
                placeholder='Enter ISBN'
                value={isbnSearch}
                onChange={(e)=>setIsbnSearch(e.target.value)}
                onKeyDown={handleEnter}
                />
                <button
                className='border-2 rounded-md p-2 pl-6 pr-6 bg-blue-500 text-white font-bold hover:bg-white hover:text-blue-500 hover:border-blue-500 transition-colors'
                onClick={handleIsbnSubmit}
                >
                    Search
                </button>
            </div>
            {error.length>0 && (
                <div className='mt-8 font-bold text-red-500'>
                    {error}
                </div>
            )}
            {deleteMsg.length>0 && (
                <div className='mt-8 font-bold text-green-500'>
                    {deleteMsg}
                </div>
            )}
        </div>

        <div className='w-full p-16  flex flex-col items-center'>
            {isIsbnCorrect && (
                <>
                    <h2 className="text-3xl font-semibold mb-8 text-green-500">Book Found !</h2>
                    <Card book = {book}/>
                    <div className='max-w-xl bg-neutral-100 mt-6 p-8 flex flex-col justify-center items-center mx-auto rounded-3xl shadow-lg'>
                        <h2 className="text-xl font-semibold text-blue-500">Are you sure you want to delete this book?</h2>
                        <div className='flex mt-6 gap-12'>
                            <button
                                className='border-2 rounded-md p-2 pl-6 pr-6 bg-neutral-500 text-white font-bold hover:bg-white hover:text-neutral-500 hover:border-neutral-500 transition-colors'
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className='border-2 rounded-md p-2 pl-6 pr-6 bg-red-500 text-white font-bold hover:bg-white hover:text-red-500 hover:border-red-500 transition-colors'
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                </div>
                </>
            )}
        </div>
    </div>
  )
}

export default DeleteBooks
