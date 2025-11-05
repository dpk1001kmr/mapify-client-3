export const msalConfig = {
  auth: {
    clientId: "b30fe25f-d839-4db1-ba00-bec20b82465d", // 👈 from Azure Portal
    authority:
      "https://login.microsoftonline.com/d6888770-182a-402b-81ae-b695d2c06904", // use your tenant ID if needed
    redirectUri:
      "https://mapify-client-3-294pjlhg8-deepak-kumars-projects-3b4205b0.vercel.app/auth/login", // 👈 must match in Azure app registration
    // postLogoutRedirectUri: "http://localhost:5173",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};

// Application id => b30fe25f-d839-4db1-ba00-bec20b82465d
// Client id => b30fe25f-d839-4db1-ba00-bec20b82465d
// Object id => adfd2307-8818-42cc-9bcc-e9836d7b98cb
// Directory (tenant) id => d6888770-182a-402b-81ae-b695d2c06904
