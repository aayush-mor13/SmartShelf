import React,{useEffect, useState} from 'react';
import axios from 'axios';

function EditBook() {

  const [isbnSearch, setIsbnSearch] = useState('');
  const [errorIsbn, setErrorIsbn] = useState('');
  const [isIsbnCorrect, setIsIsbnCorrect] = useState(false);

  const [genreList,setGenreList] = useState([]);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [img, setImg] = useState('');
  const [isbn, setIsbn] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [submitMsg,setSubmitMsg] = useState('');
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

  const handleIsbnSubmit=async () => {
    if(!isbnSearch.trim()){
      setErrorIsbn("Please Enter ISBN !");
      setSubmitMsg('');
      return;
    }
    if(isNaN(isbnSearch)){
      setErrorIsbn("ISBN must be a number !");
      return;
    }
    try{
      const res = await axios.get('http://localhost:5000/api/books',{
        headers :{
          Authorization : `Bearer ${token}`
        }
      });
      const filterbook = res.data.find((book)=>book.isbn===Number(isbnSearch));
      if(!filterbook){
        setErrorIsbn("Book not found !");
        return;
      }
      setTitle(filterbook.title);
      setAuthor(filterbook.author);
      setGenre(filterbook.genre);
      setIsbn(filterbook.isbn);
      setImg(filterbook.img);
      setYear(String(filterbook.year));
      setErrorIsbn('');
      setIsIsbnCorrect(true);
    }
    catch(err){
      console.log(err);
      setErrorIsbn("Error fetching book details !");
    }
  }

  const handleEnter=(e)=>{
    if(e.key === "Enter"){
      handleIsbnSubmit();
    }
  }

  const handleSubmit= async (e) => {
    e.preventDefault();
    
    if(!title.trim() || !author.trim() || !genre.trim() || !year.trim() || !img.trim()){
      setErrorIsbn("Please Enter all Details !");
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
    }

    setIsSubmitting(true);
    try{
      await axios.put(`http://localhost:5000/api/books/${isbn}`,book);
      setTitle('');
      setAuthor('');
      setGenre('');
      setYear('');
      setIsbn('');
      setImg('');
      setError('');
      setSubmitMsg('Book details Succesfully Updated !');
    }
    catch(err){
      console.error(err);
      setError("Error Updating Book Details");
    }
    finally{
      setIsSubmitting(false);
    }
  }

  useEffect(()=>{
    const fetchGenres = async ()=>{
      try{
        const res = await axios.get("http://localhost:5000/api/genres",{
          headers :{
            Authorization : `Bearer ${token}`
          }
        });
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
        {errorIsbn.length>0 && (
          <div className='mt-8 font-bold text-red-500'>
            {errorIsbn}
          </div>
        )}
      </div>
      {isIsbnCorrect && (
        <>
          <h1 className='text-center text-3xl pt-12 font-bold'>Edit Details</h1>
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
                  {genreList.map((data=> <option value={data.genre}>{data.genre}</option> ))}
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
                  readOnly
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
        </>
      )}
    </div>
  )
}

export default EditBook