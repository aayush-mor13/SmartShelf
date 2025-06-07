import React,{useState,useEffect} from 'react';
import axios from 'axios';
import AddAdmin from './AddAdmin';

function ManageAdmin() {

  const token = localStorage.getItem("token");
  
  const [adminList,setAdminList] = useState([]);

  useEffect(()=>{
    const fetchAdmin = async () =>{
      try{
        const response = await axios.get('http://localhost:5000/api/admin/details',{
          headers : {
            Authorization : `Bearer ${token}`
          }
        });
        setAdminList(response.data);
      }
      catch(err){
        console.log("Error fetching Admin details !",err);
      }
    }
    fetchAdmin();
  },[token]);

  return (
    <div className='w-dvh flex flex-col justify-center items-center'>
      <h1 className='text-2xl font-bold mb-12'>Manage Admins</h1>
      <div className='rounded-lg min-w-6xl mb-12 bg-neutral-100 p-8'>
        {adminList.length === 0 ? (
            <p className='text-center text-gray-500 text-xl pt-4'>No  Admins found !</p>
        ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl bg-neutral-100 p-4'>
          {adminList.map((ad) => (
            <div key={ad._id} className='w-full bg-white rounded-lg p-4 border-2 border-gray-700 min-w-[300px] min-h-[85px]'>
              <h1 className='text-lg'>Email : {ad.email}</h1>
              <h1 className='text-md'>Username : {ad.username}</h1>
            </div>
          ))}
        </div>
        )}
      </div>
      <AddAdmin/>
    </div>
  )
}

export default ManageAdmin
