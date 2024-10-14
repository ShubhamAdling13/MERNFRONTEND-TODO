import  { useState } from 'react';
import axios from 'axios';
import "./Login.css";
import {useNavigate} from 'react-router-dom'
import { apiurl } from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { apiurl } from '../api/api';
const Login =()=>{
   

    // const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login state
   const navigate =useNavigate();
    const [userInfo,setInfo] = useState( { 
        email :'',
        password:''
    });

    // const{email,password } = userInfo;

   const handlesubmit=(e)=>{
       const {name, value}= e.target;
       console.log(process.env.REACT_APP_API_URL);
       setInfo((prevInfo)=>({
           ...prevInfo,
           [name]:value
       }));
   } 

   const handleSend= async(e)=>{
      e.preventDefault();
       try{
        const result = await axios.post(`${apiurl}/user/login`, userInfo, {
            headers: {
              'Content-Type': 'application/json'
            }});
        
        console.log(result.data);
        if(result.data.message==="login successful"){
            toast("Login Successful",{position:'bottom-center'});
            //  alert("login successful");
            localStorage.setItem('token', result.data.token); 

            setTimeout(()=>{
                navigate('/home');
            },2000);
            
            
             
        }
        if(result.data.message==="wrong password"){
             toast.error("wrong password",{position:'bottom-center'});
            // alert("wrong password");

        }
        if(result.data.message==="user not registered"){
            toast.error("user not registered",{position:'bottom-center'});
            // alert("user not registered");
        }

            }
        
       catch(err){
         console.error(err.message);
         
    
       }
      

   }




    return(<div className='loginPage'>
             
           <div className='login_container'> 
           <ToastContainer/>
              <h1>Login</h1>
              <form onSubmit={handleSend}>
              <label htmlFor="email">Username</label>
              <input type="email" name="email"  onChange={handlesubmit} required />
              <label htmlFor="password">Password</label>
              <input type="password" name="password" onChange={handlesubmit}  required/>
             
              <button  type='submit'>Login</button>
             
              </form>
             {/* <a href='https://www.gogle.com'> Forget your password ?</a> */}
              <button className='register_btn' onClick={()=>{navigate('/register')}}>Register</button>
              </div>


           




    </div>)
}

export default Login;