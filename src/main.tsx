import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import "./index.css";

import { Protected } from "./middleware/Protected";
import RootLayout from "./routes/RootLayout";
const Users = lazy(() => import("./routes/Users"));
const UserDetails = lazy(() => import("./routes/UserDetails"));
const Home = lazy(() => import("./routes/Home"));
const Contact = lazy(() => import("./routes/Contact"));
const About = lazy(() => import("./routes/About"));
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
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
        children: [
          {
            path: "number",
            element: <h1>Contact me on this no: 09234232342342342344</h1>,
          },
          {
            path: "email",
            element: <h1>Contact me on this account: contactme@gmail.com</h1>,
          },
        ],
      },
      {
        path: "about",
        element: <Protected><About /></Protected>,
      },
      {
        path: "users",
        element: (
          <Protected>
            <Users />
          </Protected>
        ),
      },
      {
        path: "users/:id",
        element: (
          <Protected>
            <UserDetails />
          </Protected>
        ),
      },
      {
        path: "auth/login",
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
