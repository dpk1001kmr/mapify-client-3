import React, { useEffect } from "react";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import UploadPage from "./UploadPage";

import { useMsal } from "@azure/msal-react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/auth/authSlice";

const DashboardLayout = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const { instance } = useMsal();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 1️⃣ Logout from your backend (clear cookie)
      await fetch("https://mapify-server-3.onrender.com/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // 2️⃣ Logout from Microsoft session as well
      await instance.logoutPopup({
        mainWindowRedirectUri: "/", // where user goes after logout
      });

      // 3️⃣ Redirect to login page
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const [isAuth, setIsAuth] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          "https://mapify-server-3.onrender.com/api/v1/auth/protect",
          {
            method: "POST",
            credentials: "include",
          }
        );
        const data = await res.json();
        if (data.type === "Unauthorized") {
          toast.error(data.message);
          navigate("/auth/login");
        }
        if (data.type === "Authenticated") {
          // save user info (data.data) to redux state
          console.log("Authenticated");
          dispatch(setUser(data.data));
        }
      } catch (err) {}
    };

    checkAuth();
  }, []);

  return (
    <div className="flex h-screen">
      {openSidebar && (
        <aside className="w-[300px] border border-gray-300">
          <header className="h-[3rem] border border-t-0 border-l-0 border-r-0 border-gray-300 flex items-center px-3">
            <span className="font-bold text-[1.125rem]">Mapify</span>
          </header>
          {/* sidebar content */}
          <div className="">
            <ul className="menu menu-sm rounded-box w-full">
              <li
                onClick={() =>
                  document.getElementById("my_modal_4").showModal()
                }
              >
                <a>Upload</a>
              </li>
              <li>
                <a>Filter</a>
              </li>
            </ul>
            {/* Upload Modal Box */}
            <dialog id="my_modal_4" className="modal">
              <div className="modal-box w-11/12 max-w-5xl max-h-[calc(100vh-3rem)]">
                <UploadPage />
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button, it will close the modal */}
                    <button className="btn btn-sm">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </aside>
      )}
      <main className="grow border-l-0 border border-gray-300 flex flex-col">
        <header className="h-[3rem] border border-t-0 border-l-0 border-r-0 border-gray-300 flex items-center px-3">
          <button
            className="btn btn-square btn-sm text-lg"
            onClick={() => setOpenSidebar(!openSidebar)}
            data-testid="toggle-sidebar-button"
          >
            <IoMdMenu />
          </button>
          <span className="btn btn-sm ms-auto me-2">
            Welcome - {user?.email}
          </span>
          <button className="btn btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </header>
        <div className="flex-1 h-[calc(100vh-3rem)]">
          {/* children here */}
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
