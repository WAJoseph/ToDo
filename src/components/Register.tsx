import React, { useState } from 'react';
import axios from 'axios';

const Register: React.FC = () => {
  // State variables to store the user's input
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Make a POST request to the register endpoint with the user's input
      await axios.post('/api/register', {
        username,
        email,
        password,
      });
      // Handle successful registration (e.g., display success message)
      console.log('Registration successful!');
      // Redirect to the login page
      window.location.href = '/login';
    } catch (error) {
      // Handle registration failure (e.g., display error message)
      console.error('Registration failed!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
