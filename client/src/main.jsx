import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Goals from './components/Goals'
import MyNavBar from './components/Navbar'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/Goals",
    element: <Goals/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
);
