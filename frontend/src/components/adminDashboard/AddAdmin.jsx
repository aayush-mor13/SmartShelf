import React,{useState} from 'react';
import axios from 'axios';

function AddAdmin() {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('');
    const [registerMsg, setRegisterMsg] = useState('');

    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const passwordRegex = {
        length: /.{8,}/,
        upper: /[A-Z]/,
        lower: /[a-z]/,
        digit: /[0-9]/,
        special: /[!@#$%^&*(),.?":{}|<>]/
    };

    const handleSubmit= async (e) => {
        e.preventDefault();

        if(!email.trim() || !username.trim() || !password.trim()){
            setError('Please Enter all Details !');
            setRegisterMsg('');
            return;
        }
        if(email.length>0 && !regex.test(email)){
            setError("Please Enter correct Email");
            setRegisterMsg('');
            return;
        }
        if(!passwordRegex.length.test(password)){
            setError("Password must be atleast 8 characters long !");
            setRegisterMsg('');
            return;
        }
        if(!passwordRegex.upper.test(password)){
            setError("Password must contain atleast one Uppercase letter !");
            setRegisterMsg('');
            return;
        }
        if(!passwordRegex.lower.test(password)){
            setError("Password must contain atleast one Lowercase letter !");
            setRegisterMsg('');
            return;
        }
        if(!passwordRegex.digit.test(password)){
            setError("Password must contain atleast one digit !");
            setRegisterMsg('');
            return;
        }
        if(!passwordRegex.special.test(password)){
            setError("Password must contain atleast one special character !");
            setRegisterMsg('');
            return;
        }
        const user = {
            email,
            username,
            password,
            role : 'admin'
        }
        try{
            await axios.post('http://localhost:5000/api/auth/register',user);
            setRegisterMsg('Registered Successfully !');
            setEmail('');
            setUsername('');
            setPassword('');
            setError('');
        }
        catch(err){
            setRegisterMsg('');
            if(err.response && err.response.data && err.response.data.message && err.response.data.message.includes("E11000")){
                setError("A user with this Username already exists !");
            }
            else if(err.response && err.response.data && err.response.data.message){
                setError(err.response.data.message);
            }
            else{
                setError("Error Posting User Details");
            }
        }
    }

  return (
    <div className='flex justify-center items-center'>
      <form
      className='w-96 bg-neutral-100 p-8 flex flex-col items-center mx-auto rounded-3xl shadow-lg'
      >
        <h1 className='mb-8 text-blue-500 font-bold text-3xl'>Add Admin</h1>
        <div className='flex flex-col gap-4 items-center'>
            <div>
                <input 
                type="text"
                placeholder='Enter email'
                className='h-6 w-60  mb-4 p-4 rounded-lg border-gray-200 border-2'
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                />
            </div>
            <div>
                <input 
                type="text"
                placeholder='Enter username'
                className='h-6 w-60 mb-4 p-4 rounded-lg border-gray-200 border-2'
                value={username}
                onChange={(e)=>{setUsername(e.target.value)}}
                />
            </div>
            <div>
                <input 
                type="text"
                placeholder='Enter password'
                className='h-6 w-60 mb-4 p-4 rounded-lg border-gray-200 border-2'
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                />
            </div>
            {(error.length>0 || registerMsg.length>0) &&  (
                <div className='flex flex-col items-center justify-center mb-4 min-h-[48px]'>
                    {error.length>0 && (
                        <div className='w-full font-bold text-red-500 text-wrap text-center'>
                            {error}
                        </div>
                    )}
                    {registerMsg.length>0 &&(
                        <div className='font-bold text-green-500 text-center'>
                            {registerMsg}
                        </div>
                    )}
                </div>
            )}
             <div className='flex flex-col items-center justify-center'>
                <button 
                className='min-w-32 border-2 rounded-md p-2 pl-4 pr-4 bg-blue-500 text-white font-bold hover:bg-white hover:text-blue-500 hover:border-blue-500 transition-colors'
                onClick={handleSubmit}
                >
                    Register Admin
                </button>
            </div>
        </div>
      </form>
    </div>
  )
}

export default AddAdmin;