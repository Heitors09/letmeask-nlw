import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NewRoom } from "./Pages/NewRoom.tsx";
import { Home } from "./Pages/Home.tsx";
import { Room } from "./Pages/Room.tsx";
import { AdminRoom } from "./Pages/AdminRoom.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/new-room",
        element: <NewRoom />,
      },
      {
        path: "/new-room/:id",
        element: <Room />,
      },
      {
        path: "/admin/new-room/:id",
        element: <AdminRoom />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
