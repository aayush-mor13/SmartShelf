import React,{useRef} from 'react'
import ExploreBooks from './ExploreBooks'
import SearchBook from './SearchBook';
import SuggestBook from './SuggestBook';

function Home() {

  const role = localStorage.getItem('role');
  const exploreRef = useRef();
  const searchRef = useRef();
  const suggestRef = useRef();

  const handleScrollExplore=()=>{
    exploreRef.current.scrollIntoView({behavior : "smooth"});
  }

  const handleScrollSearch=()=>{
    searchRef.current.scrollIntoView({behavior : "smooth"});
  }

  if(role === 'admin'){
    return;
  }

  return (
      <div>
        <div className='bg-[url(../public/images/background.jpg)] m-2 h-[calc(100vh-82px)] bg-no-repeat bg-cover bg-center'>
          <div className='bg-white/30 backdrop-blur-0 w-full h-full'>
            <div className='h-full flex flex-col items-center justify-center gap-20'>
              <div className='flex flex-col gap-4 items-center'>
                <p className='text-8xl'>SmartShelf</p>
                <p className='text-2xl'>"Next-Gen Bookshelf for the Digital Age"</p>
              </div>
              <div className='flex gap-20'>
                <button 
                className='border-2 rounded-md p-2 bg-blue-500 text-white font-bold hover:bg-white hover:text-blue-500 hover:border-blue-500 transition-colors'
                onClick={handleScrollExplore}  
                >
                  Explore Books
                </button>
                <button 
                className='border-2 rounded-md p-2 pl-4 pr-4 bg-blue-500 text-white font-bold hover:bg-white hover:text-blue-500 hover:border-blue-500 transition-colors'
                onClick={handleScrollSearch}  
                >
                  Search Book
                </button>
              </div>
            </div>
          </div>
        </div>
        <div ref={exploreRef}>
          <ExploreBooks/>
        </div>
        <div ref={searchRef}>
          <SearchBook suggestRef={suggestRef}/>
        </div>
        <div ref={suggestRef}>
          <SuggestBook/>
        </div>
    </div>
  )
}

export default Home
