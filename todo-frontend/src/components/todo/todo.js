import { useEffect, useState } from "react";
import "./todo.css";

const Todo = () => {
  const [activityval, setActivityval] = useState("");
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);




  const callthisFor = (e) => {
    if (e == "pending") {

      alert("Please Complete already going task first")
    } else {
      window.location.reload()
    }
  }

  useEffect(() => {
    fetch("https://todo-backend-001.herokuapp.com/todo/getall", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `${token}`
      },
    }).then((data) => data.json())
      .then((response) => setData(response.todos))
  }, [token])

  const handelAction = (e) => {
    let str = document.getElementById(e.target.id).innerText

    if (str === "Start") {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `${token}` },
        body: JSON.stringify({ id: e.target.id })
      };
      fetch('https://todo-backend-001.herokuapp.com/todo/start', requestOptions)
        .then(response => response.json())
        .then(data => callthisFor(data.status))



    } else if (str === "End") {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `${token}` },
        body: JSON.stringify({ id: e.target.id })
      };
      fetch('https://todo-backend-001.herokuapp.com/todo/end', requestOptions)
        .then(response => response.json())
        .then(window.location.reload())

    } else {

    }
  }


  const handelLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "/"
  }


  const AddActivity = (e) => {
    e.preventDefault();
    if (activityval.trim().length === 0) {

    } else {

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `${token}`, 'Host': 'todo-backend-001.herokuapp.com', 'Cache-Control': 'max-age=0', 'Upgrade-Insecure-Request': '1' },
        body: JSON.stringify({ activity: activityval })
      };
      fetch('https://todo-backend-001.herokuapp.com/todo/addtodo', requestOptions)
        .then(response => response.json())
        .then(data => {
          window.location.reload()
        })


    }
  }
  return (
    <>
      <div className="headerto">
        <h2 className="userkanam">{username}</h2>
      </div>
      <div className="mainsect">
        <div className="todosec">
          <div className="tdhisto">
            <h4 className="h4todo">To do List</h4>
            <h5>History</h5>
            {
              data.map((each) => {
                if (each.status == "Completed") {
                  return (
                    <div>
                      <span><strong>{each.activity} &nbsp; &nbsp; &nbsp; {each.timetaken}</strong></span>

                    </div>)
                }
              })
            }
          </div>
          <div className="logoutbtncls">
            <button onClick={(e) => handelLogout(e)}>Logout</button>
          </div>
        </div>
        <div className="tablesec">
          <div className="addactivity">
            <input onChange={(e) => setActivityval(e.target.value)} placeholder="Activity" className="activinp" />
            <button onClick={(e) => AddActivity(e)} className="actbtn">Add New Activity</button>
          </div>
          <div className="showactivity">
            <table className="table" id="tbl1">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Status</th>
                  <th>Time taken<br />(Hrs:Min:Sec)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((each) => {
                  return (
                    <tr key={each._id}>
                      <td>{each.activity}</td>
                      <td>{each.status}</td>
                      <td>{each.timetaken}</td>
                      <td id={each._id} onClick={(e) => handelAction(e)} className="actbbtn" >{each.action}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )

};
export default Todo;