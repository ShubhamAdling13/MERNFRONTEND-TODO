// import { Link } from "react-router-dom";
import "./AddNote.css"
import { useState } from "react";
import axios from "axios";
import { apiurl } from "../api/api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
// import notes from "../components/Notes";

const AddNote=()=>{
       
    const navigate = useNavigate();
      const token =localStorage.getItem('token');
    const [noteData,setData]= useState({
        title:'',
        content:''
    });

    const handleChange=(e)=>{
           const{name,value} = e.target;
          setData((prevData)=>({...prevData 
            , [name]:value
          })
             
          );
    }

    const handleAdd=async(e)=>{
             e.preventDefault();
             try {
            
            const result = await axios.post(`${apiurl}/user/addNote`,noteData,{
               headers:{
                'Content-Type': 'application/json',
                   Authorization:`Bearer ${token}`
               }
            });

            if(result.status===201){
                console.log(result.data);
                toast("Note Saved Successfully !",{position:"bottom-center"});
                setTimeout(()=>{
                    navigate('/home');
                },2000);
                
                console.log("note added");
            }
           
                
             } catch (error) {
                
              console.log(error.message);
            }
  } 

   
    return(
        <div className="addnotecontainer"> 
       
      <div className="container">
      <ToastContainer/>
        <form onSubmit={handleAdd}>
       <div>  <input name="title" id="tite" placeholder="Enter Title" onChange={handleChange} /></div>
       <div><textarea  name="content" id="cont" rows="5" placeholder="Enter Description" maxLength=" 25" onChange={handleChange} /></div>
       <div><button type="submit" > Submit</button></div>
       </form>
      </div>
      </div>   
    
    )

}
export default AddNote;

    