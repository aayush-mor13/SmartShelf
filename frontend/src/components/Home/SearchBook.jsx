import React,{useState} from 'react';
import axios from 'axios';
import Card from './Card';

function SearchBook({suggestRef}) {

  const [inputValue,setInputValue] = useState('');
  const [book,setBook] = useState(null);
  const [error,setError] = useState('');
  const [suggestbtn,setSuggestbtn] = useState(false);
  
  const handleSubmit=async ()=>{
    if(!inputValue.trim()){
      setBook(null);
      setError("Please enter a book title !");
      setSuggestbtn(false);
      return;
    }

    try{
      const res = await axios.get(`http://localhost:5000/api/books/title/${inputValue}`);
      if(res.data.length===0){
        setBook(null);
        setInputValue('');
        setError('No books found. You can suggest it!');
        setSuggestbtn(true);
      }
      else{
        setBook(res.data[0]);
        setInputValue('');
        console.log(res.data);
        setError('');
        setSuggestbtn(false);
      }
    }
    catch(err){
      console.error(err);
      setInputValue('');
      setError('Something went wrong while fetching the book !');
      setBook(null);
      setSuggestbtn(false);
    }
  }

  const handleEnter=(e)=>{
    if(e.key ==="Enter"){
      handleSubmit();
    }
  }

  const handleSuggestScroll=()=>{
    suggestRef.current.scrollIntoView({behavior : 'smooth'});
  }

  return (
    <div className='w-full bg-neutral-100 p-14 flex items-center'>
        <img 
        src="/images/searchbook.png" 
        className='h-52 pl-40'
        alt="Search book"
        />
        <div className='pl-40'>
            <h1 className='text-center text-6xl pt-16 font-bold'>Search Book</h1>
            <div className='flex justify-center gap-12 mt-20 mb-20'>
                <input 
                type="text"
                placeholder='Search by book title'
                className='h-12 w-96 p-4 rounded-lg border-gray-200 border-2'
                value = {inputValue}
                onChange={(e)=>setInputValue(e.target.value)}
                onKeyDown={handleEnter}
                />
                <button
                onClick={handleSubmit} 
                className='h-12 pl-12 pr-12 border-2 rounded-lg p-2 bg-blue-500 text-white font-bold hover:bg-white hover:text-blue-500 hover:border-blue-500 transition-colors'>
                Search
                </button>
            </div>
            <div>
              {!error && book && <Card key={book._id} book={book}/>}
              {error && <p className='text-red-500 text-center mt-4 font-bold text-2xl'>{error}</p>}
            </div>
            {suggestbtn && 
            <div className='flex justify-center mt-8'>
              <button
              onClick={handleSuggestScroll}
              className='h-12 pl-12 pr-12 border-2 rounded-lg p-2 bg-blue-500 text-white font-bold hover:bg-white hover:text-blue-500 hover:border-blue-500 transition-colors'>
                Suggest Now
            </button>
            </div>
            }
        </div>
    </div>
  )
}

export default SearchBook
