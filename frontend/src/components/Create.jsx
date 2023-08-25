import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

const Create = () => {
   const [name,setName] =useState("");
   const [email,setEmail] =useState("");
   const [age,setAge] =useState();
   const [error,setError]=useState("");
   const navigate=useNavigate();

   console.log(name,email,age);

   async function handleSubmit(e){
    e.preventDefault();

    const addUser={name,email,age};

    const response= await fetch("https://mern-app-backend-indol.vercel.app",{
      method:"POST",
      body:JSON.stringify(addUser),
      headers:{
        "Content-Type":"application/json"
      },
      mode: "no-cors"
    });

    const result=await response.text();

    if(response.ok){
      console.log(result);
      setName("");
    setEmail("");
    setAge("");
    setError("");
    navigate("/all");


    }
    if(!response.ok){
      console.log(result.error);
      setError(result.error);

    }
   }
  return (
    
    <div classNameName='container my-2'>
    {error && <div className='alert alert-danger'>{error}</div>}
    <h2 classNameName='text-center'>Enter the data</h2>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Name</label>
    <input type="text" className="form-control" value={name} onChange={(e)=>{setName(e.target.value);}}/>
  </div>
  <div className="mb-3">
    <label className="form-label">Email address</label>
    <input type="email" className="form-control"  aria-describedby="emailHelp" value={email} onChange={(e)=>{setEmail(e.target.value);}} />
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Age</label>
    <input type="number" className="form-control" value={age} onChange={(e)=>{setAge(e.target.value);}} />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Create;