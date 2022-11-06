import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Todo from "./components/todo/todo";


const RoutesC = () => {
  const user = localStorage.getItem("token")


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={user ? <Todo /> : <Login />} />
        <Route path="/register" exact element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
};
export default RoutesC;
