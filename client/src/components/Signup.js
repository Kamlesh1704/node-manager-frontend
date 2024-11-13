import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const host = "https://node-manager-back-k.onrender.com";
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, password})
    });
    const json = await response.json();
    console.log(json)
    if(json.success){
      // Save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      navigate('/');
      props.showAlert("Account created successfully", "success")
    }
    else{
      props.showAlert("Invalid Credentials", "danger")
    }
}

const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
}

  return (
    <div style={{backgroundColor:"rgb(29,35,39)",color:"white", height:"90.2vh", width:"100vw",marginLeft:"-120px"}}>
    <div className="container pt-5">
      <h2 className="pt-3">Create and account to use NoteManager</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
          <div id="emailHelp" style={{color:"white"}} className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="password" onChange={onChange} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    </div>
  )
}

export default Signup
