import "./EditNote.css"

// import { Link } from "react-router-dom";
import "./AddNote.css"
import { useState } from "react";
import axios from "axios";
import { apiurl } from "../api/api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
// import notes from "../components/Notes";
import { useEffect } from "react";
const EditNote=()=>{
       

    const { id } = useParams(); 
    const [note, setNote] = useState({ title: '', content: '' });
    const navigate = useNavigate(); 

    useEffect(() => {

        const fetchNote = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const response = await axios.get(`${apiurl}/user/getsingleNote/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setNote(response.data); 
            } catch (err) {
                console.error('Error fetching note:', err);
            }
        };
        fetchNote();
    }, [id]);
  

    const handleChange=(e)=>{
           const{name,value} = e.target;
           setNote((prevData)=>({...prevData 
            , [name]:value
          })
             
          );
    }

  



 
  const handleSave = async (e) => {
      e.preventDefault();
      try {
          const token = localStorage.getItem('token');
          await axios.put(`${apiurl}/user/updateNote/${id}`, note, {
              headers: { Authorization: `Bearer ${token}` }
          });
          toast.success("Note updated successfully",{position:'bottom-center'})
          setTimeout(()=>{
            navigate('/home'); 
          },2000);
         
      } catch (err) {
          console.error('Error updating note:', err);
      }
  };




   
    return(
        <div className="addnotecontainer"> 
       
      <div className="container">
      <ToastContainer/>
        <form onSubmit={handleSave}>
       <div>  <input name="title" id="tite" placeholder="Enter Title" onChange={handleChange} /></div>
       <div><textarea  name="content" id="cont" rows="5" placeholder="Enter Description" maxLength=" 25" onChange={handleChange} /></div>
       <div><button type="submit" > Submit</button></div>
       <div><button onClick={()=>{
         navigate('/home');
       }} >Cancel</button></div>
       </form>
      </div>
      </div>   
    
    )

}
export default EditNote;

    