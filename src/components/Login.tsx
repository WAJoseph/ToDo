import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
  // State variables to store the username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Make a POST request to the login endpoint with username and password
      const response = await axios.post('/api/login', { username, password });
      // Extract the session token from the response
      const sessionToken = response.data.session_token;
      // Set the session token in the local storage
      localStorage.setItem('session_token', sessionToken);
      // Make a GET request to the whoami endpoint to retrieve the user information
      const userResponse = await axios.get('/api/method/frappe.desk.user.get_logged_user');
      // Extract the user data from the response
      const user = userResponse.data;
      // Handle successful login (e.g., redirect to the to-do list page)
      console.log('Login successful!', user);
      // Redirect to the to-do list page
      window.location.href = '/todo';
    } catch (error) {
      // Handle login failure (e.g., display error message)
      console.error('Login failed!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
