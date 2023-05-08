import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import Goals from './components/Goals';
import Profile from './components/Profile';
import { Auth0Provider} from '@auth0/auth0-react';
import Home from './components/Home';
import MyNavBar from './components/Navbar';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN;
const CLIENTID = import.meta.env.VITE_AUTH0_CLIENT_ID;
const IDENTIFIER = import.meta.env.VITE_AUTH0_IDENTIFIER;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/Goals",
    element: <Goals/>,
  },
  {
    path: "/user-profile",
    element: <Profile/>
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={DOMAIN}
      clientId={CLIENTID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: IDENTIFIER,
        scope: "openid profile email",
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);


