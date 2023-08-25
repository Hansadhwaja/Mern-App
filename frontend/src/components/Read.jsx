import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Read = () => {
  const [error,setError]=useState("");
  const [data,setData]=useState([]);


async function getData(){
  const response=await fetch("https://mern-app-backend-indol.vercel.app", {mode: "no-cors"});
  const result=await response.text();
  
  if(response.ok){
    console.log(result);
    setError("");
    setData(result);

  }
  if(!response.ok){
    console.log(result.error);
    setError(result.error);

  }
}

const handleDelete= async (id)=>{
  console.log(id);
  const response=await fetch(`https://mern-app-backend-indol.vercel.app/${id}`,{
    method:"DELETE",
    mode: "no-cors"
  });
  const result=await response.text();
  if(response.ok){
    setError("Successfully Deleted");

    setTimeout(()=>{
      setError("");
      getData();
    },1000);
  }
  if(!response.ok){
    console.log(result.error);
    setError(result.error);

  }
}

useEffect(()=>{
  getData();
    },[]);

  return (
    <div className='container my-2'>
     {error && <div className='alert alert-danger'>{error}</div>}
    <h2 className='text-center'>All Data</h2>
    <div className='row'>
    {data.map((ele)=>(
      <div key={ele._id} className='col-3'>
        <div className="card">
          <div className="card-body">
           <h5 className="card-title">{ele.name}</h5>
           <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
           <p className="card-text">{ele.age}</p>
           <a href="#" className="card-link" onClick={()=>handleDelete(ele._id)}>Delete</a>
           <Link to={`/${ele._id}`} className="card-link">Edit</Link>
         </div>
       </div>
      </div>
    ))}
   
    </div>

    </div>
  )
}

export default Read;