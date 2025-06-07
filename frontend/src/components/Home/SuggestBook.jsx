import {useState} from 'react'
import axios from 'axios';

function SuggestBook() {

    const [title,setTitle] = useState('');
    const [author,setAuthor] = useState('');
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [notes,setNotes] = useState('');
    const [error,setError] = useState('');
    const [submitMsg,setSubmitMsg] = useState('');
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [fetchProfile, setFetchProfile] = useState(false);

    const book = {
        title,
        author,
        name,
        email,
        notes
    }

    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    const fetchUserDetails=async ()=>{
        const token = localStorage.getItem("token");
        if(token){
            try{
                const user = await axios.get('http://localhost:5000/api/user/details', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setName(user.data.username);
                setEmail(user.data.email);
                setFetchProfile(true);
            }
            catch(err){
                console.error("Error fetching user details !",err);
            }
        }
    }

    const handleTitleChange = (e) =>{
        setTitle(e.target.value);
        if(!fetchProfile && e.target.value.trim().length>0){
            fetchUserDetails();
        }
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        if(!title.trim()){
            setError("Please Enter Title of the Book");
            setSubmitMsg('');
            return;
        }
        if(email.length>0 && !regex.test(email)){
            setError("Please Enter correct Email");
            setSubmitMsg('');
            return;
        }

        setIsSubmitting(true);
        try{
            await axios.post('http://localhost:5000/api/suggestedbooks',book);
            setTitle('');
            setAuthor('');
            setName('');
            setEmail('');
            setNotes('');
            setError('');
            setSubmitMsg("Thank you for your suggestion! We'll review it and try to add the book soon.");
        }
        catch(err){
            setError("Error posting data");
        }
        finally{
            setIsSubmitting(false);
        }
    }

  return (
    <div className=''>
      <h1 className='text-center text-3xl pt-12 font-bold'>Can't Find the Book ?</h1>
      <h3 className='text-center text-base pt-3 text-gray-800 mb-6'>Let us know what you're search for. We'll try to add it soon !</h3>
      <form
      className='max-w-xl bg-neutral-100 p-8 flex flex-col items-center mx-auto rounded-3xl shadow-lg'
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
            onChange={handleTitleChange}
            />
        </div>
        <div className='flex flex-col'>
            <label
            className='mb-1 font-semibold'
            >
                Author Name
            </label>
            <input 
            type="text"
            className='h-10 w-96 mb-6 p-4 rounded-lg border-gray-200 border-2'
            value={author}
            onChange={(e)=>{setAuthor(e.target.value)}}
            />
        </div>
        <div className='flex gap-2'>
            <div className='flex flex-col'>
                <label
                className='mb-1 font-semibold'
                >
                    Your Name
                </label>
                <input 
                type="text"
                className={`h-10 w-48 mb-6 p-4 rounded-lg border-gray-200 border-2 ${fetchProfile ? 'bg-neutral-50 cursor-not-allowed' : '' }`}
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
                readOnly = {fetchProfile}
                />
            </div>
            <div className='flex flex-col'>
                <label
                className='mb-1 font-semibold'
                >
                    Your Email
                </label>
                <input 
                type="email"
                className={`h-10 w-48 mb-6 p-4 rounded-lg border-gray-200 border-2 ${fetchProfile ? 'bg-neutral-50 cursor-not-allowed' : '' }`}
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                readOnly = {fetchProfile}
                />
            </div>
        </div>
        <div className='flex flex-col'>
            <label
            className='mb-1 font-semibold'
            >
                Notes
            </label>
            <textarea
            className='h-40 w-96 p-4 rounded-lg border-gray-200 border-2'
            value={notes}
            onChange={(e)=>{setNotes(e.target.value)}}
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
            onClick={handleSubmit}
        >
            {isSubmitting ? "Submitting..." : "Submit Suggestion"}
        </button>
      </form>
    </div>
  )
}

export default SuggestBook;