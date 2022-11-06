
import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import axios from "axios";


const Login = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handelLogin = async (e) => {
    e.preventDefault();
    if (username.length === 0 || password.length === 0) {
      setMessage("Enter All The Fields*");
    } else {
      try {
        let url = "https://todo-backend-001.herokuapp.com/login"
        const data = {
          username: username,
          password: password
        }
        const { data: res } = await axios.post(url, data);
        if (res.status === "Sucess") {
          localStorage.setItem("token", res.token);
          localStorage.setItem("username", res.username);
          window.location.href = "/"
        } else {
          setMessage(res.message);
        }
      } catch (e) {
        if (e) {
          setMessage(e.response.data.message);
        }
      }
    }

  }


  return (
    <div className="logincontain">
      <div className="loginbox">
        <form>
          <div className="loginname">
            <h1>Member Login</h1>
          </div>
          <div className="mb-3">
            <input onChange={(e) => setUsername(e.target.value)} placeholder="Username" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <input onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="altermesg">
            <p>{message}</p>
          </div>
          <button onClick={(e) => handelLogin(e)} type="submit" className="btn btn-primary" id="loginbtns">LOGIN</button>
          <p>Not A user? <Link to="/register">Go to Register page.</Link></p>
        </form>
      </div>
    </div>
  )

};
export default Login;