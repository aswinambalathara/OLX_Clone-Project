import React, { useState, useContext } from "react";
import Logo from "../../olx-logo.png";
import "./Signup.css";

import { FirebaseContext } from "../../store/Contexts";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Signup() {
  const history = useHistory()
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors,setErrors] = useState({});
  const { firebase } = useContext(FirebaseContext);

  const validateForm = () =>{
    const errors = {};
    if(!username){
      errors.username = "User name is required";
    }

    if(!email){
      errors.email = "Email is required";
    }else if(!/\S+@\S+\.\S+/.test(email)){
      errors.email = "Invalid Email";
    }

    if(!mobile){
      errors.mobile = "Mobile Number is required";
    }else if(!/^\d{10}$/.test(mobile)){
      errors.mobile = "Invalid Mobile Number";
    }

    if(!password){
      errors.password = "Password is required";
    }else if(password.length < 6){
      errors.password = "Password must be atleast 6 characters";
    }

    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const signupErrors = validateForm();
    if(Object.keys(signupErrors).length === 0){
      setErrors({})
      firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
        result.user.updateProfile({displayName:username}).then(()=>{
          firebase.firestore().collection('users').add({
            id:result.user.uid,
            username:username,
            phone : mobile
          }).then(()=>{
            history.replace('/login')
          })
        })
      })
    }else{
      setErrors(signupErrors);
    }
  };
  return (
    <div>
      <div className="signupParentDiv">
      <Link to='/'>
        <img width="200px" height="200px" src={Logo}></img>
        </Link>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          {errors.username && <p style={{color:'red',fontSize:'small'}}>{errors.username}</p>}
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          {errors.mobile && <p style={{color:'red',fontSize:'small'}}>{errors.mobile}</p>}
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
          <button>Signup</button>
        </form>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}
