
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import braingrey from '../assets/braingrey.png'
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";

function MyNavBar(props) {

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <>
      <Navbar id="navbar" data-testid="navbar" bg="blue" variant="light" sticky="top" className="custom-navbar">
        <Container className="custom-navbar-container">
          <Navbar.Brand href="/">
            <img
              src={braingrey}
              height="73"
              className="d-lg-inline-block"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand> 
        {isAuthenticated ? (
          <Nav.Link href="Goals" >Goals</Nav.Link>     ) : ""}
          {!user ? null : <Navbar.Text  id="username"> Welcome, {user.name}</Navbar.Text>}
      
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
          
            <Navbar.Text>
              {!isAuthenticated ? (<button className="login-button" onClick={() => loginWithRedirect()}>Log In</button>) : (<button className="logout-button" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Log Out
              </button>)}

            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default MyNavBar;
