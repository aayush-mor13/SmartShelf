import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import Card from './Card';
import axios from 'axios';
import GenreSearch from '../genrewiseBooks/GenreSearch';

function ExploreBooks() {

  const [books,setBooks] = useState([]);
  const [genre,setGenre] = useState([]);

  useEffect(()=>{
    const fetchBooks=async ()=>{
      try{
        const res = await axios.get('http://localhost:5000/api/books')
        setBooks(res.data);
        console.log(res.data);

        const genres=[...new Set(res.data.map(book=>book.genre))];
        console.log(genres);
        setGenre(genres);
      }
      catch(err){
        console.log(err);
      }
    };
    fetchBooks();
  },[]);

  return (
    <div
    className='flex flex-col items-center'>
      <h1 className='rounded-lg mt-6 p-3 text-4xl text-center font-bold mx-auto bg-gradient-to-r from-blue-600 to-blue-300 text-transparent bg-clip-text'>Explore Books</h1>
      
      {genre.slice(0,3).map((gen)=>{
        const filteredbooks = books.filter((book)=>book.genre===gen);
        return(
          <div
          className='w-full'>
            <p className='ml-14 pl-4 text-2xl font-bold border-l-8 border-blue-500 text-gray-700 mt-8  mb-4'>{gen}</p>

            <div className='flex flex-wrap gap-4 justify-evenly'>
              {filteredbooks.slice(0,3).map((book)=>
                <Card key={book._id} book={book}/>
              )}
            </div>

            <div className='mt-6 text-center'>
              {filteredbooks.length>3 && (
                <Link to={`/genre/${gen}`}>
                  <button 
                  className='border-2 rounded-md p-2 bg-blue-500 text-white font-bold hover:bg-white hover:text-blue-500 hover:border-blue-500 transition-colors'
                  >
                    See All Books
                  </button>
                </Link>
              )}
            </div>
            <div className="h-0.5 w-full bg-gray-200 shadow-lg rounded-md my-8 mx-auto max-w-6xl" />
          </div>
        )
      }
      )}
      <GenreSearch/>
      <div className="h-0.5 w-full bg-gray-200 shadow-lg rounded-md my-8 mx-auto max-w-6xl" />
    </div>
  )
}

export default ExploreBooks
