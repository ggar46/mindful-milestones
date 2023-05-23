import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import Goals from './components/goal_components/Goals';
import { Auth0Provider} from '@auth0/auth0-react';
import 'semantic-ui-css/semantic.min.css'


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


