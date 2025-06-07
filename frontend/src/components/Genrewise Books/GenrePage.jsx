import React,{useState,useEffect} from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '../Home/Card';

function GenrePage(){
    
    const [books,setBooks] = useState([]);
    const [loading,setLoading] = useState(true);
    const {genre} = useParams();

    useEffect(()=>{
        const fetchGenreBooks = async()=>{
            setLoading(true);
            try{
                const res =await axios.get(`http://localhost:5000/api/books/genre/${genre}`);
                if(res.data && res.data.length>0){
                    setBooks(res.data);
                }
                else{
                    console.error("No books found");
                    setBooks([]);
                }
                setLoading(false);
            }
            catch(err){
                console.error(err);
            }
        }
        fetchGenreBooks();
    },[genre]);

    return(
        
        <div>
            {loading ? (
                <div className='mt-12 p-6 mx-auto text-center font-bold text-blue-600 text-2xl bg-neutral-100 max-w-xl rounded-xl'>
                    Loading...
                </div>
            ) : books.length>0 ? (
                <>
                    <p className='ml-14 pl-4 text-2xl font-bold border-l-8 border-blue-500 text-gray-700 mt-8  mb-4'>{genre}</p>
                    <div className='flex flex-wrap gap-4 justify-evenly'>
                    {books.map((book)=>
                        <Card key={book._id} book={book}/>
                    )}
                    </div>
                </>
                ) : books.length===0 && (
                <div className='mt-12 p-6 mx-auto text-center font-bold text-red-600 text-4xl bg-neutral-100 max-w-xl rounded-xl'>
                    No books Found !
                </div>
            )
            }
        </div>
    )
}

export default GenrePage