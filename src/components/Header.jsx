import { Link, useNavigate } from "react-router-dom";
import React from "react";

const Header = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // To programmatically navigate after logout

  // Logout function to clear the token and redirect
  const handlelogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // Navigate to login or home page after logout
  };

  return (
    <div className="header">
      <h1>TO-D0-LIST</h1>
      {token ? (
         <div className="header_container">
          <Link to="/home/addNote">
            <button className="plus">Add</button>
          </Link>
          <button className="Logout" onClick={handlelogout}>Logout</button>
          </div>
      ) : null} {/* Render nothing if token doesn't exist */}
   
     </div>
  );
};

export default Header;
