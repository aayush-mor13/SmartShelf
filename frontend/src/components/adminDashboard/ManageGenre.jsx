import React,{useEffect,useState} from 'react'
import axios from 'axios';

function ManageGenre() {

    const token = localStorage.getItem('token');

    const [genreList, setGenreList] = useState([]);
    const [genre,setGenre] = useState('');
    const [error,setError] = useState('');
    const [addMsg, setAddMsg] = useState('');

    useEffect(()=>{
    const fetchGenres = async ()=>{
      try{
        const res = await axios.get("http://localhost:5000/api/genres");
        const genres = res.data;
        if(!genres){
          setError("No Genres Exist !");
          setAddMsg('');
          return;
        }
        setGenreList(genres);
        console.log(genres);
      }
      catch(err){
        console.error(err);
        setError("Error fetching genres");
        setAddMsg('');
      }
    }
    fetchGenres();
  },[genre]);

    const handleSubmit = async () =>{
        if(!genre.trim()){
            setError("Please Enter Genre !");
            setAddMsg('');
            return;
        }
        const genreExists = genreList.some(
            (g)=> g.genre.toLowerCase() === genre.trim().toLowerCase()
        );
        if (genreExists) {
        setError("Genre already exists !");
        setAddMsg('');
        return;
        }

        try{
            await axios.post('http://localhost:5000/api/genres',{genre},{
                headers :{
                    Authorization : `Bearer ${token}`
                }
            })
            setAddMsg("Genre Added Succesfully !");
            setError('');
            setGenre('');
        }
        catch(err){
            setError("Error Posting Genre details !");
            setAddMsg("");
            setAddMsg('');
        }
    }

    const handleEnter = (e) => {
        if(e.key === 'Enter'){
            handleSubmit();
        }
    }

    const handleDelete = async(id) => {
        try{
            await axios.delete(`http://localhost:5000/api/genres/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setGenreList((prev) => prev.filter((g)=>g._id !== id));
            setError('');
            setAddMsg("");
        }
        catch(err){
            setError("Error deleting genre !");
            setAddMsg('');
            setAddMsg("");
        }
    }

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-2xl font-bold mb-12'>Manage Genres</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-lg max-w-5xl mb-12 bg-neutral-100 p-8'>
        {genreList.map((g)=>  
        <div key={g._id} className='p-2 bg-blue-500 font-bold flex flex-row justify-between items-center rounded-xl shadow-lg hover:scale-110 transition-all'>
            <span className='px-2 text-white text-xl'>{g.genre}</span>
            <button
            className='bg-white text-red-500 rounded-md w-6 h-6 flex items-center justify-center text-sm hover:bg-red-500 hover:text-white transition-all'
            onClick={()=>handleDelete(g._id)}
            title='Delete'
            >
                X
          </button>
        </div>)}
    </div>
      <div className='max-w-xl bg-neutral-100 p-8 flex flex-col justify-center items-center mx-auto rounded-3xl shadow-lg'>
        <div className='flex flex-row gap-16'>
          <input 
          type="text"
          className='h-10 w-56 p-4 rounded-lg border-gray-200 border-2'
          placeholder='Enter Genre'
          value={genre}
          onChange={(e)=>setGenre(e.target.value)}
          onKeyDown={handleEnter}
          />
          <button
          className='border-2 rounded-md p-2 pl-6 pr-6 bg-blue-500 text-white font-bold hover:bg-white hover:text-blue-500 hover:border-blue-500 transition-colors'
          onClick={handleSubmit}
          >
            Add Genre
          </button>
        </div>
        {error.length>0 && (
          <div className='mt-8 font-bold text-red-500'>
            {error}
          </div>
        )}
        {addMsg.length>0 && (
          <div className='mt-8 font-bold text-green-500'>
            {addMsg}
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageGenre;