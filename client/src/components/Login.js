import React, { useState } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth"

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [user, setUser] = useState({
    username: '',
    password: ''
  })
  
  const changeHandler = (event) => {
    setUser({...user, [event.target.name]: event.target.value})
  }

  const submitHandler = (event) => {
    event.preventDefault();
    axiosWithAuth().post(`http://localhost:5000/api/login`, user)
    .then(res => {
      console.log(res);
      window.localStorage.setItem('token', res.data.payload);
      props.history.push('/bubble-page')
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <input onChange={changeHandler} name="username" placeholder="username..."/>
        <input onChange={changeHandler} name="password" placeholder="password..."/>
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
