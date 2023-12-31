import React from "react";
import "./UserList.css";
import { useState, useEffect } from "react";

const UserList = () => {
  const host = 'http://localhost:5000/api';
  const userURL = `${host}/user`;
  const [users, setUsers] = useState([]);

  const handleGetUsers = () => fetch("http://localhost:5000/api/users")
  .then((response) => response.json())
  .then(({ users }) => setUsers(users))
  .catch(err => { console.error(err) });

  const handleDeleteUser = ({ _id }) => {
    fetch(`${userURL}/${_id}`, { method:"DELETE" })
      .then(response => response.json())
      .then(handleGetUsers)
      .catch(err => { console.error(err) });
  }

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <section className="users-dashboard">
      <div className="dashboard-header">
        <a href="#">
          <button>Add User</button>
        </a>
        <input className="input" type="text" placeholder="Search..." />
      </div>
      { users.length && (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First-Name</th>
              <th>Last-Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { users.map(user => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <box-icon style={{ cursor:"pointer"}} color="#94a3b8" name="edit"></box-icon>
                    <box-icon style={{ cursor:"pointer"}} color="#94a3b8" name="x" onClick={() => handleDeleteUser(user)}></box-icon>
                  </td>
                </tr>
              )) }
          </tbody>
        </table>
      )}        
    </section>
  );
};

export default UserList;
