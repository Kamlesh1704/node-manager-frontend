import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const host = "https://node-manager-back-k.onrender.com";
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        // console.log(json)
        if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("Logged in successfully", "success")
            navigate('/');
        }
        else{
            props.showAlert("Invalid Details", "danger")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    <div style={{backgroundColor:"rgb(29,35,39)",color:"white", height:"90.2vh", width:"100vw",marginLeft:"-120px"}}>
    <div className="container pt-5" >
      <h2 className="pt-3 pb-3">Login to continue to NoteManager</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
            <div style={{color:"white"}} id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    </div>
  )
}

export default Login
