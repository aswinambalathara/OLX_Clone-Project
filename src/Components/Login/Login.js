import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../store/Contexts";
import Logo from "../../olx-logo.png";
import "./Login.css";
import {useHistory} from 'react-router-dom'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors,setErrors] = useState({});
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

const validate = ()=>{
  const errors = {}

  if(!email){
    errors.email = "Email is required";
  }else if(!/\S+@\S+\.\S+/.test(email)){
    errors.email = "Invalid Email";
  }

  if(!password){
    errors.password = "Password is required";
  }else if(password.length < 6){
    errors.password = "Password must be atleast 6 characters";
  }

  return errors
}

  const handleLogin = (e) => {
    e.preventDefault();
    const loginErrors = validate();

    if(Object.keys(loginErrors).length === 0){
      setErrors({})
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.replace('/')
      })
      .catch((error) => {
        console.log(error)
      });
    }else{
      setErrors(loginErrors);
    }
   
  };

  return (
    <div>
      <div className="loginParentDiv">
        <Link to='/'>
        <img width="200px" height="200px" src={Logo}></img>
        </Link>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          {errors.email && <p style={{color:'red',fontSize:'small'}}>{errors.email}</p>}
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          {errors.password && <p style={{color:'red',fontSize:'small'}}>{errors.password}</p>}
          <br />
          <button>Login</button>
        </form>
        <Link to='/signup'>Signup</Link>
      </div>
    </div>
  );
}

export default Login;
