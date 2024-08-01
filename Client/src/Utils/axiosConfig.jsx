const token = localStorage.getItem("token");
console.log(token);
export const config = {
  headers: {
    authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};
