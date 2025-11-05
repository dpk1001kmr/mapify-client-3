// import React from "react";

// import {
//   createBrowserRouter,
//   Navigate,
//   RouterProvider,
// } from "react-router-dom";

// import AuthLayout from "./pages/AuthLayout.jsx";
// import LoginPage from "./pages/LoginPage.jsx";
// import DashboardLayout from "./pages/DashboardLayout.jsx";
// import ErrorPage from "./pages/ErrorPage.jsx";
// import HomePage from "./pages/HomePage.jsx";
// import { MsalProvider } from "@azure/msal-react";
// import { PublicClientApplication } from "@azure/msal-browser";
// import { msalConfig } from "./authConfig.js";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         index: true,
//         element: <Navigate to="/auth/login" replace />,
//       },
//       {
//         path: "auth",
//         element: <AuthLayout />,
//         children: [
//           {
//             path: "login",
//             element: <LoginPage />,
//           },
//         ],
//       },
//       {
//         path: "dashboard",
//         element: (
//           <DashboardLayout>
//             <HomePage />
//           </DashboardLayout>
//         ),
//       },
//     ],
//   },
// ]);

// const msalInstance = new PublicClientApplication(msalConfig);

// const App = () => {
//   return (
//     <MsalProvider instance={msalInstance}>
//       <RouterProvider router={router} />
//     </MsalProvider>
//   );
// };

// export default App;

import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import AuthLayout from "./pages/AuthLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig.js";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/auth/login" replace /> },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [{ path: "login", element: <LoginPage /> }],
      },
      {
        path: "dashboard",
        element: (
          <DashboardLayout>
            <HomePage />
          </DashboardLayout>
        ),
      },
    ],
  },
]);

const msalInstance = new PublicClientApplication(msalConfig);

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // ✅ Explicitly initialize MSAL before use
    msalInstance.initialize().then(() => {
      setIsInitialized(true);
    });
  }, []);

  if (!isInitialized) {
    return <div>Loading authentication...</div>;
  }

  return (
    <MsalProvider instance={msalInstance}>
      <RouterProvider router={router} />
    </MsalProvider>
  );
};

export default App;
