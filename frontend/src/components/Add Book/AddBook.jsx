import React,{useState,useEffect} from 'react';
import axios from 'axios';

function AddBook() {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [isbn, setIsbn] = useState('');
  const [img, setImg] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [submitMsg,setSubmitMsg] = useState('');

  const [genreList,setGenreList] = useState([]);

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

  const handleSubmit= async (e) => {
    e.preventDefault();
    
    if(!title.trim() || !author.trim() || !genre.trim() || !year.trim() || !isbn.trim() || !img.trim()){
      setError("Please Enter all Details !");
      setSubmitMsg('');
      return;
    }

    if(isNaN(isbn)){
      setError("ISBN must be a number !");
      setSubmitMsg('');
      return;
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    if(year>currentYear){
      setError(`Year must be less than ${currentYear} !`);
      setSubmitMsg('');
      return;
    }

    const book = {
      title,
      author,
      year,
      genre,
      img,
      isbn
    };

    setIsSubmitting(true);
    try{
      await axios.post('http://localhost:5000/api/books',book,{
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      });
      setTitle('');
      setAuthor('');
      setGenre('');
      setYear('');
      setIsbn('');
      setImg('');
      setError('');
      setSubmitMsg('Book details Succesfully Added !');
    }
    catch(err){
      console.error(err);
      if(err.response && err.response.data && err.response.data.message && err.response.data.message.includes("E11000")){
        setError("A book with this ISBN already exists !");
        setSubmitMsg('');
      }
      else if(err.response && err.response.data && err.response.data.message){
        setError(err.response.data.message);
        setSubmitMsg('');
      }
      else{
        setError("Error Posting Book Details");
        setSubmitMsg('');
      }
    }
    finally{
      setIsSubmitting(false);
    }
  }

  useEffect(()=>{
    const fetchGenres = async ()=>{
      try{
        const res = await axios.get("http://localhost:5000/api/genres");
        const genres = res.data;
        if(!genres){
          setError("No Genres Exist !");
          console.error("No Genres Exist !");
          return;
        }
        setGenreList(genres);
        console.log(genres);
      }
      catch(err){
        console.error(err);
        setError("Error fetching genres"); 
      }
    }
    fetchGenres();
  },[]);

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
      <h1 className='text-center text-3xl pt-12 font-bold'>Add Books</h1>
      <form
      className='max-w-xl bg-neutral-100 mt-6 p-8 flex flex-col items-center mx-auto rounded-3xl shadow-lg'
      onSubmit={handleSubmit}
      >
        <div className='flex flex-col'>
            <label
            className='mb-1 font-semibold'
            >
                Book Title
                <span className='text-red-500 font-extrabold'> *</span>
            </label>
            <input 
            type="text"
            className='h-10 w-96  mb-6 p-4 rounded-lg border-gray-200 border-2'
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
        </div>
        <div className='flex flex-col'>
            <label
            className='mb-1 font-semibold'
            >
                Author Name
                <span className='text-red-500 font-extrabold'> *</span>
            </label>
            <input 
            type="text"
            className='h-10 w-96 mb-6 p-4 rounded-lg border-gray-200 border-2'
            value={author}
            onChange={(e)=>setAuthor(e.target.value)}
            />
        </div>
        <div className='flex flex-col'>
          <label
            className='mb-1 font-semibold'
            for="genres"
          >
            Genre
            <span className='text-red-500 font-extrabold'> *</span>
          </label>
          <select
            id="genres" 
            className="h-10 w-96 mb-6 pl-3 bg-white border-gray-200 border-2 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-black block"
            value={genre}
            onChange={(e)=>setGenre(e.target.value)}
          >
            <option hidden>Choose a genre</option>
            {genreList.map((data,index)=> (<option key={index} value={data.genre}>{data.genre}</option> ))}
          </select>
        </div>
        <div className='flex gap-2'>
            <div className='flex flex-col'>
                <label
                className='mb-1 font-semibold'
                >
                    Published in (year)
                    <span className='text-red-500 font-extrabold'> *</span>
                </label>
                <input 
                type="number"
                className='h-10 w-48 mb-6 p-4 rounded-lg border-gray-200 border-2'
                value={year}
                onChange={(e)=>setYear(e.target.value)}
                />
            </div>
            <div className='flex flex-col'>
                <label
                className='mb-1 font-semibold'
                >
                    ISBN
                    <span className='text-red-500 font-extrabold'> *</span>
                </label>
                <input 
                type="text"
                className='h-10 w-48 mb-6 p-4 rounded-lg border-gray-200 border-2'
                value={isbn}
                onChange={(e)=>setIsbn(e.target.value)}
                />
            </div>
        </div>
        <div className='flex flex-col'>
            <label
            className='mb-1 font-semibold'
            >
                Book Cover (image link)
                <span className='text-red-500 font-extrabold'> *</span>
            </label>
            <input
            type='url'
            className='h-10 w-96 p-4 rounded-lg border-gray-200 border-2'
            value={img}
            onChange={(e)=>setImg(e.target.value)}
            />
        </div>
        {error.length>0 && (
            <div className='mt-4 font-bold text-red-500'>
                {error}
            </div>
        )}
        {submitMsg.length>0 &&(
            <div className='mt-4 font-bold text-green-500 text-wrap text-center pl-4 pr-4'>
                {submitMsg}
            </div>
        )}
        <button
            className='mt-6 border-2 rounded-md p-2 pl-4 pr-4 bg-blue-500 text-white font-bold hover:bg-white hover:text-blue-500 hover:border-blue-500 transition-colors'
        >
            {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  )
}

export default AddBook