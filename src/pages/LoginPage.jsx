import { useMsal } from "@azure/msal-react";
import React from "react";
import { loginRequest } from "../authConfig";

export default function LoginPage() {
  const { instance } = useMsal();

  const handleLogin = async () => {
    try {
      const response = await instance.loginPopup(loginRequest);
      const account = response.account;

      const name = response.account.name;
      const username = response.account.username;
      const idToken = response.idToken;

      // Send token to backend
      // const idToken = response.idToken;
      const res = await fetch(
        "https://mapify-server-3.onrender.com/api/v1/auth/microsoft",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ idToken }),
        }
      );

      const data = await res.json();
      console.log("Backend verified user:", data);

      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-8 text-center">
        <h2 className="text-2xl font-semibold mb-6">Sign in to Mapify</h2>

        <button
          className="btn btn-primary w-full flex items-center justify-center gap-2"
          onClick={handleLogin}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
            alt="Microsoft Logo"
            className="w-5 h-5"
          />
          Continue with Microsoft
        </button>
      </div>
    </div>
  );
}
