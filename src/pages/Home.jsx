import React, { useEffect, useState } from "react";
// import notes from "./Notes";
// import { Link } from "react-router-dom";
import "./Home.css"
import { apiurl } from "../api/api";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home =()=> {
         

    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
 
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get(`${apiurl}/user/getNote`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, 
                    },
                });
                setNotes(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching notes');
            }
        };

        fetchNotes();
    }, []);


    const handleDelete= async(key)=>{
        try{
         const response = await axios.delete(`${apiurl}/user/deleteNote/${key}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`, 
            },
         });
         toast("Note deleted successfully",{position:"bottom-center" });
         console.log(response.data.message); // Show success message
         setNotes((prevNotes) => prevNotes.filter(note => note._id !== key));
         // Optionally, refresh the notes list or remove the deleted note from the UI
     } catch (error) {
         console.error('Error deleting note:', error.response?.data?.message || 'Error deleting note');
     }


    }

    const handleUpdate =async(key)=>{

               navigate(`/home/edit/${key}`);
         

    }

   

  return (<div className="homepage"> 
      <div className="homepage_container">
    <ToastContainer/>
    {error && <p>{error}</p>}
 { notes.map((item) => (

  
    <div className="note" key={item._id}>
      <h1>{item.title}</h1>
      <p>{item.content}</p>
      <p><button onClick={()=>{handleUpdate(item._id)}}>Edit</button></p>
      <p> <button onClick={()=>{handleDelete(item._id)}}>  Delete  </button>  </p>
    </div>
 
  ) ) }
   </div>
  </div>);
}

export default Home;