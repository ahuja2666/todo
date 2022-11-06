import { useState } from "react";
import "./register.css"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handelRegister = async (e) => {
    e.preventDefault();
    if (Username.length === 0 || password.length === 0) {
      setMessage("Enter All The Fields*");
    } else if (password !== confirmpassword) {
      setMessage("Confirm password is not matched*");
    } else if (password.length < 6 || password.length > 16) {
      setMessage("password should be minimum 6 chracter , max 16*");
    }
    else {
      try {
        let url = "https://todo-backend-001.herokuapp.com/register"
        const data = {
          username: Username,
          password: password
        }
        const { data: res } = await axios.post(url, data);
        if (res.message === "Registration successful") {
          navigate("/");
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
    <div className="register-container">
      <div className="register-box">
        <form>
          <div className="rhead">
            <h1>Register</h1>
          </div>
          <div className="mb-3">
            <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
          </div>
          <div className="mb-3">
            <input onChange={(e) => setPassword(e.target.value)} minLength="6" maxLength="16" placeholder="Password" type="password" className="form-control" id="exampleInputPassword1" required />
          </div>
          <div className="mb-3">
            <input onChange={(e) => setConfirmPassword(e.target.value)} minLength="6" maxLength="16" placeholder="Confirm Password" type="password" className="form-control" id="exampleInputPassword2" required />
          </div>
          <div className="messageerr">
            <p>{message}</p>
          </div>
          <button type="submit" className="btn btn-primary" id="btn-register" onClick={(e) => handelRegister(e)}>Register</button>
          <div>
            <p>Already a user ?<Link to="/">Go to Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  )

};
export default Register;