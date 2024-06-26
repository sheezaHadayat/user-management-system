
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { deleteUser } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";

const UserDetailsPage = () => {
  const { userId } = useParams();
  const { users, setUsers } = useContext(UserContext);
  const currentUser = users.find((user) => user.id === parseInt(userId));
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [newName, setNewName] = useState(currentUser?.name);
  const [newEmail, setNewEmail] = useState(currentUser?.email);
  const [newPhone, setNewPhone] = useState(currentUser?.phone);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    // Fetch user details from the users array using userId
    const currentUser = users.find((user) => user.id === parseInt(userId));
    if (currentUser) {
      setCurrentUser(currentUser);
    }
  }, [userId, users, setCurrentUser]);

  const handleDelete = () => {
   
      setShowDeleteModal(true);
     
  };

  const handleUpdate = () => {
    const updatedUser = {
      ...currentUser,
      name: newName || currentUser.name,
      email: newEmail || currentUser.email,
      phone: newPhone || currentUser.phone,
    };
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === parseInt(userId) ? updatedUser : user
      )
    );
    setShowSuccessModal(true);
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div class="container">
          <h2 class="navbar-brand m-0">User Details</h2>
          
          <a href="/" className="btn btn-dark">Logout</a>
        </div>
      </nav>
      <div className="form-group">
        <label> Name:</label>
        <input
          type="text"
          className="form-control mt-1"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div className="form-group my-4">
        <label> Email:</label>
        <input
          type="email"
          className="form-control mt-1"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      </div>
      <div className="form-group my-4">
        <label> Phone:</label>
        <input
          type="text"
          className="form-control mt-1"
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
        />
      </div>

      <button
        className="btn btn-secondary me-2"
        onClick={() => navigate("/user-listing")}
      >
        Back
      </button>
      <button className="btn btn-primary me-2" onClick={handleUpdate}>
        Update User
      </button>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete User
      </button>


      {/* Update Modal */}
      <div
        className={`modal fade ${showSuccessModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showSuccessModal ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Success</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowSuccessModal(false)}
              />
            </div>
            <div className="modal-body">User updated successfully.</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/user-listing");
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>




      {/* Delete Modal */}
      <div
        className={`modal fade ${showDeleteModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showDeleteModal ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Success</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowDeleteModal(false)}
              />
            </div>
            <div className="modal-body">Are you sure you want to delete User</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setUsers((prevUsers) =>
                    prevUsers.filter((user) => user.id !== parseInt(userId))
                  )

                  setShowDeleteModal(false);
                  navigate("/user-listing");
                }}
              >
                Yes
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setShowDeleteModal(false);
                  
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
