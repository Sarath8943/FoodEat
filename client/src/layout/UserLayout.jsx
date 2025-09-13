// import React, { useEffect, useState } from "react";
// import Footer from "../components/user/Footer";
// import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
// import Header from "../components/user/Header";
// import UserHeader from "../components/user/UserHeader";
// import { axiosInstance } from "../config/axiosInstance";
// import { useDispatch, useSelector } from "react-redux";
// import { clearUserData, saveUserData } from "../redux/features/authSlice";

// const UserLayout = () => {
//   const { isUserAuth, userData } = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const location = useLocation();

//   const checkUser = async () => {
//     try {
//       const response = await axiosInstance({
//         method: "GET",
//         url: "/user/check-user",
//       });
//       dispatch(saveUserData());
//     } catch (error) {
//       dispatch(clearUserData());
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     checkUser();
//   }, [location.pathname]);

//   return (
//     <div>
//       {isUserAuth ? <UserHeader /> : <Header />}
//       <div className="min-h-96">
//         <Outlet />
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default UserLayout;
import React, { useEffect } from "react";
import Footer from "../components/user/Footer";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/user/Header";
import UserHeader from "../components/user/UserHeader";
import { axiosInstance } from "../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData, saveUserData } from "../redux/features/authSlice";

const UserLayout = () => {
  const { isUserAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const checkUser = async () => {
    try {
      await axiosInstance.get("/user/check-user");
      dispatch(saveUserData());
    } catch (error) {
      dispatch(clearUserData());
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full">
        {isUserAuth ? <UserHeader /> : <Header />}
      </header>

      {/* Main content */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default UserLayout;
