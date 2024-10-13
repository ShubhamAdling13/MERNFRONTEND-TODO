import axios from "axios";
import { useState } from "react"
import { apiurl } from "../api/api";
import "./Register.css"
import { useNavigate } from "react-router-dom";

const Register=()=>{

    const navigate = useNavigate();

      const [user,setUser]= useState({
        email:'',
        password:''
      });

    //   const {email,password}=user;
   
      const handlesubmit = (e) => {
        const { name, value } = e.target; // <-- Correct: No spread or destructuring issues here.
        setUser((prevUser) => ({
          ...prevUser,
          [name]: value, // Update the state correctly based on the input field's name and value.
        }));
      };

      const handleRegister=async(e)=>{
        e.preventDefault();
       try {

        const result = await axios.post(`${apiurl}/user/register`,user,{
            headers:{
                "Content-Type":'application/json'
            }
        });
        console.log(result.data.message);
        if(result.data.message==="User registered successfully"){
             navigate('/');
        }
        
       } catch (error) {
        
       }
          

      }
 
  
    return(<div className="registerUser">
        
    
              
              <div className='register_container'> 
   
                 <h1>Register</h1>
                 <form onSubmit={handleRegister}>
                 <label htmlFor="email">Username</label>
                 <input type="email" name="email"  onChange={handlesubmit} required />
                 <label htmlFor="password">Password</label>
                 <input type="password" name="password" onChange={handlesubmit}  required/>
                 <button  type='submit'>Register</button>
                 </form>

           </div>

    </div>)

}

export default Register;