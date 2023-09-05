import React from "react";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <ToastContainer
        position='bottom-right'
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        toastStyle={{
          backgroundColor: "#222",
          color: "#fff",
          borderRadius: "4px",
          fontSize: "14px",
          border: "1px solid #446ee7",
        }}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme='dark'
      />
    </div>
  );
};

export default Layout;
