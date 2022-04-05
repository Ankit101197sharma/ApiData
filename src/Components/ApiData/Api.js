import React, { useEffect, useState } from "react";
import classes from "./Api.module.css"

function Api() {
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    getList();
  }, []);
  //  console.warn(users)
  function getList() {
    fetch("https://jsonplaceholder.typicode.com/posts").then((result) => {
      result.json().then((resp) => {
        setUsers(resp);
        setTitle(resp[0].title);
        setBody(resp[0].body);
        setUserId(resp[0].id);
      });
    });
  }
  //  function saveUser(){
  //      console.warn({name,email,gender});
  //      let itemData = {name,email,gender}
  //      fetch("https://jsonplaceholder.typicode.com/posts",{
  //          method:"POST",
  //          headers:{
  //              "Accept":"Application/json",
  //              "Content-Type":"application/json"
  //          },
  //          body:JSON.stringify(itemData)
  //      }).then((result)=>{
  //          console.warn("result", result);
  //          result.json().then((resp)=>{
  //              console.warn("resp", resp);
  //          })
  //      })
  //  }

  function deleteUser(id,index) {
      const updateItems= users.filter((elm)=>{
          return index !== elm.id
      })
      alert("id deleted:" + id)
      setUsers(updateItems)
    // fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    //   method: "DELETE",
    // }).then((result) => {
    //   result.json().then((resp) => {
    //     console.warn(resp);
    //     alert("id deleted :" + id);

    //     getList();
    //   });
    // });
  }

  function selectUser(id) {
    console.warn("function called", users[id - 1]);
    let item = users[id - 1];
    setTitle(item.title);
    setBody(item.body);
    setUserId(item.id);
  }
  function updateUser() {
    console.warn(title, body, userId);
    let item = { title, body, userId };
    fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);

        getList();
      });
    });
  }

  return (
    <div className={classes.mainDiv} >
      <div>
        <h1>Get API Call</h1>
        <div>
          Name
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            name="title"
          />
          <br />
          Email
          <input
            type="text"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
            name="body"
          />
          <br />
          <button type="button" onClick={updateUser}>
            update user
          </button>
        </div>
        <table border="1">
          <tr className={classes.tableRow}>
            <td>userId</td>
            <td>id</td>
            <td>Title</td>
            <td>Body</td>
            <td>Operations</td>
          </tr>
          {users.map((item, i) => (
            <tr key={i}>
              <td>{item.userId}</td>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.body}</td>
              <td>
                <button style={{backgroundColor:'green'}} onClick={() => selectUser(item.id)}>Update</button>
              </td>

              <td>
                <button style={{backgroundColor:'red'}} onClick={() => deleteUser(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
export default Api;
