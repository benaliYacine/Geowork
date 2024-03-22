import React from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
export default function ChoseUserType() {
  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const userType = event.target.type.value;
    console.log('Selected user type:', userType);

    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual endpoint to post the selected value
      const response = await axios.post('/signup/google/type', { type: userType });
      if(response.data.redirectUrl){
        window.location.href=response.data.redirectUrl;
      }
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="userType">Choisissez un type de compte:</label>
        <select id="userType" name="type" required>
          <option value="">Choisissez un type de compte</option>
          <option value="Client">Client</option>
          <option value="Professionnel">Professionnel</option>
        </select>
      </div>
      <button type="submit">Choose</button>
    </form>
  );
}
