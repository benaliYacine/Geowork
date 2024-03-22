import React from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
export default function InputWilayaCity() {
  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(event.target);
    const wilaya = formData.get('wilaya');
    const city = formData.get('city');

    try {
      // Replace '/continueSignup' with the actual endpoint to post the form data
      const response = await axios.patch('/continueSignup', { wilaya, city });
      if (response.data.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      }
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="wilaya">Wilaya :</label>
        <input type="text" id="wilaya" name="wilaya" required />
      </div>
      <div>
        <label htmlFor="city">Ville :</label>
        <input type="text" id="city" name="city" required />
      </div>
      <button type="submit">Continue</button>
    </form>
  );
}
