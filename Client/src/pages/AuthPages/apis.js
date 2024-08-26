import  axios  from 'axios';
import { config } from '../../Utils/axiosConfig';
import { base_url } from '../../Utils/baseUrl'; 
export const forgotPasswordToken = async (data) => {
  const response = await axios.post(
    `${base_url}user/forgot-password-token`,
    data,
    config
  );
  return response.data;
};

export const resetUserPassword = async (data) => {
  const response = await axios.put(
    `${base_url}user/reset-password/${data.token}`,
    { password: data.password }
  );
  return response.data;
};

export const CheckResetPasswordUser = async (data) => {
  const response = await axios.get(
    `${base_url}user/reset-password/${data.token}`
  );
  return response.data;
};

export const logout = async () => {
  try {
    const response = await fetch(`${base_url}user/logout`, {
      method: "POST",
      credentials: "include", // Include cookies in the request
    });

    if (response.ok) {
      // Logout successful, clear local storage and redirect to login page
      localStorage.clear();
      window.location.href = "/login";
    } else {
      console.error("Error logging out:", response.statusText);
    }
  } catch (error) {
    console.error("Error logging out:", error);
  }
};