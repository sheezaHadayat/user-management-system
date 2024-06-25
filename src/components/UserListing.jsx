import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { fetchUsers } from "../services/api";
import { debounce } from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";

const UserListingPage = () => {
  const { users, setUsers } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (users.length === 0) {
      fetchUsers().then((response) => {
        setUsers(response.data);
      });
    }
  }, [users, setUsers]);

  const debouncedSearch = debounce((term) => {
    setSearchTerm(term);
  }, 500);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <h2 class="navbar-brand m-0">User Listing</h2>
          <a href="/" className="btn btn-dark">Logout</a>
        </div>
      </nav>
      <div className="form-group my-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Link
                    to={`/user-details/${user.id}`}
                    className="btn btn-info"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <center>loading</center>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserListingPage;
