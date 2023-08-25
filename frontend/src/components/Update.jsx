import React, { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const [name,setName] =useState("");
   const [email,setEmail] =useState("");
   const [age,setAge] =useState();
   const [error,setError]=useState("");
   const {id}=useParams();
   const navigate=useNavigate();


const getSingleData=async ()=>{
 const response=await fetch(`https://mern-app-backend-indol.vercel.app/${id}`, {mode: "no-cors"});
  const result=await response.json();
  
  if(response.ok){
    console.log("updated user",result);
    setError("");
    setName(result.name);
    setEmail(result.email);
    setAge(result.age);

  }
  if(!response.ok){
    console.log(result.error);
    setError(result.error);

  }
}
async function handleEdit(e){
  e.preventDefault();

  const updatedUser={name,email,age};

  const response= await fetch(`https://mern-app-backend-indol.vercel.app/${id}`,{
    method:"PATCH",
    body:JSON.stringify(updatedUser),
    headers:{
      "Content-Type":"application/json"
    }, 
    mode: "no-cors"
  });

  const result=await response.json();

  if(response.ok){
    console.log(result);
  setError("");
  navigate("/all");
  }
  if(!response.ok){
    console.log(result.error);
    setError(result.error);

  }
 }
useEffect(()=>{
  getSingleData();
    },[]);

  return (
    <div classNameName='container my-2'>
    {error && <div className='alert alert-danger'>{error}</div>}
    <h2 classNameName='text-center'>Edit the data</h2>
    <form onSubmit={handleEdit}>
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

export default Update;