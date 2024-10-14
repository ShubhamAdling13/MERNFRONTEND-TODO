const Footer=()=>{
    const currentYear = new Date().getFullYear();
    return(<div className="footer">
        <hr />
       <p> &copy;  {currentYear} Shubham Sunil Adling </p> 
 
    </div>)
}

export default Footer ;