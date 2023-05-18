
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import brainWebLogo from '../assets/brainWebLogo.png'
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet, Link } from "react-router-dom";

function MyNavBar(props) {

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <>
      <Navbar data-testid="navbar" bg="light" variant="light" sticky="top">
        <Container className="custom-navbar-container">
          <Navbar.Brand href="/">
            <img
              src={brainWebLogo}
              height="30"
              className="d-lg-inline-block"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand> 
        {isAuthenticated ? (
          <Nav.Link href="Goals" >Goals</Nav.Link>     ) : ""}
          {!user ? null : <Nav.Link to="/user-profile" as={Link}>{user.name}</Nav.Link>}

      
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
          
            <Navbar.Text>
              {!isAuthenticated ? (<button onClick={() => loginWithRedirect()}>Log In</button>) : (<button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
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
