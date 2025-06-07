import React,{useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('');
    const [loginMsg, setLoginMsg] = useState('');

    const navigate = useNavigate();

    const handleSubmit= async (e) => {
        e.preventDefault();

        if(!username.trim() || !password.trim()){
            setError('Please Enter all Details !');
            setLoginMsg('');
            return;
        }

        const user = {
            username,
            password
        }
        try{
            const response = await axios.post('http://localhost:5000/api/auth/login',user);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role',response.data.role);
            setLoginMsg('Logged-In Successfully !');
            setUsername('');
            setPassword('');
            setError('');
            if(response.data.role === 'admin'){
                navigate('/dashboard');
            }
            else{
                navigate('/');
            }
        }
        catch(err){
            setLoginMsg('');
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
    <div className='w-dvw h-dvh flex justify-center items-center'>
      <form
      className='max-w-xl bg-neutral-100 p-16 py-16 flex flex-col items-center mx-auto rounded-3xl shadow-lg'
      >
        <h1 className='mb-6 text-blue-500 font-bold text-6xl'>Login</h1>
        <h3 className='mb-12 text-gray-700 text-lg font-bold'>Welcome back !</h3>
        <div className='flex flex-col gap-4'>
            <div>
                <input 
                type="text"
                placeholder='Enter username'
                className='h-10 w-80 mb-6 p-4 rounded-lg border-gray-200 border-2'
                value={username}
                onChange={(e)=>{setUsername(e.target.value)}}
                />
            </div>
            <div>
                <input 
                type="text"
                placeholder='Enter password'
                className='h-10 w-80 mb-6 p-4 rounded-lg border-gray-200 border-2'
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                />
            </div>
            <div className='flex flex-col items-center justify-center mb-4'>
                {error.length>0 && (
                    <div className='mt-4 font-bold text-red-500'>
                        {error}
                    </div>
                )}
                {loginMsg.length>0 &&(
                    <div className='mt-4 font-bold text-green-500 text-wrap text-center pl-4 pr-4'>
                        {loginMsg}
                    </div>
                )}
            </div>
            <div className='flex flex-col items-center justify-center'>
                <button 
                className='min-w-32 border-2 rounded-md p-2 pl-4 pr-4 bg-blue-500 text-white font-bold hover:bg-white hover:text-blue-500 hover:border-blue-500 transition-colors'
                onClick={handleSubmit}
                >
                   Login
                </button>
                <span className='text-gray-700 text-xs m-4'>Not registered? <Link to='/register' className='hover:underline'>Click here to Register</Link></span>
            </div>
        </div>
      </form>
    </div>
  )
}

export default Login;