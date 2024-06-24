import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import UserListingPage from './components/UserListing';
import UserDetailsPage from './components/UserDetails';
import { UserProvider } from './contexts/userContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <UserProvider>
      <Router>
      <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/user-listing" element={<UserListingPage />} />
          <Route path="/user-details/:userId" element={<UserDetailsPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
