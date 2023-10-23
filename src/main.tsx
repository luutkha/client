import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import "./index.css";


import { Protected } from "./middleware/Protected";
import CreateChatGroupForm from "./routes/chat-group/CreateChatGroupForm";
import RootLayout from "./routes/RootLayout";
const Home = lazy(() => import("./routes/Home"));
const ErrorPage = lazy(() => import("./routes/ErrorPage"));
const Auth = lazy(() => import("./routes/auth/AuthenticationForm/AuthenticationForm"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Protected>
          <Home />
        </Protected>
        ,
      },
      {
        path: "/group/:id",
        element: (
          <Protected>
            <CreateChatGroupForm />
          </Protected>
        ),
      },

      // if path is need to logged in, wrap it in to <Protected/> component 
      // {
      //   path: "users/:id",
      //   element: (
      //     <Protected>
      //       <UserDetails />
      //     </Protected>
      //   ),
      // },
      {
        path: "auth",
        element: <Auth />,
      }
    ],
  },


]);


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
