import React from 'react'

function Card({book}) {
    
  return (
    <div className='w-3/12 min-w-96 p-3 px-12 mb-6 bg-blue-100 rounded-xl shadow-lg hover:scale-[1.03] hover:shadow-2xl transition'>
        <img src={book.img} alt="Book" className='w-full h-64 pt-4 pb-4 pr-10 pl-10'/>
        
        <div className='p-4'>
            <h3 className='text-lg text-blue-900 font-semibold w-fit mx-auto text-center'>{book.title}</h3>
            <p className='text-md text-blue-700 mb-1 w-fit mx-auto'>by {book.author}</p>
            <p className='text-sm text-blue-600 w-fit mx-auto'>Published in {book.year}</p>
            <p className='text-sm text-blue-600 w-fit mx-auto'>ISBN : {book.isbn}</p>
        </div>
    </div>
  )
}

export default Card;