import React from "react";
import { logout } from "../../Store/authSlice";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutBtn = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutBtn}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
