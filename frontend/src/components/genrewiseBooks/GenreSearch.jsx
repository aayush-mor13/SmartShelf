import React,{useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function GenreSearch() {

    const [genreList,setGenreList] = useState([]);
    const [genreSearch,setGenreSearch] = useState('');
    const [error,setError] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchGenre = async ()=>{
            try{
                const res = await axios.get('http://localhost:5000/api/genres');
                const genres = res.data;
                if(!genres){
                    setError("No Genres found !");
                    return;
                }
                setGenreList(genres);
            }
            catch(err){
                console.error(err);
                setError('Error occured while fetching Genres !');
            }
        }
        fetchGenre();
    })

    const handleGenreSubmit = () =>{
        if(!genreSearch){
            setError('Please Select Genre !');
            return;
        }
        navigate(`genre/${genreSearch}`);
    }

  return (
    <div>
      <h1 className='text-center text-3xl font-bold'>Browse More Genres</h1>
      <div className='max-w-xl bg-neutral-100 mt-6 p-8 flex flex-col justify-center items-center mx-auto rounded-3xl shadow-lg'>
        <div className='flex flex-row gap-16'>
                <select
                id="genres" 
                className="h-10 w-56 pl-3 bg-white border-gray-200 border-2 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-black block"
                value={genreSearch}
                onChange={(e)=>setGenreSearch(e.target.value)}
                >
                  <option hidden>Choose a genre</option>
                  {genreList.map((data=> <option value={data.genre}>{data.genre}</option> ))}
                </select>
                <button
          className='border-2 rounded-md p-2 pl-6 pr-6 bg-blue-500 text-white font-bold hover:bg-white hover:text-blue-500 hover:border-blue-500 transition-colors'
          onClick={handleGenreSubmit}
          >
            Search
          </button>
        </div>
        {error.length>0 && (
          <div className='mt-8 font-bold text-red-500'>
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

export default GenreSearch
