import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

function Header({ userData }) {
  const history = useHistory();

  const handlelogout = () => {
    localStorage.clear(userData);
    history.push("/login");
  };
  const location = useLocation();

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
          >
            <i className="fas fa-ellipsis-v"></i>
          </Button>
        </div>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" navbar>
            <Nav.Item>
              <Nav.Link className="m-0">
                <span className="no-icon">Account</span>
              </Nav.Link>
            </Nav.Item>

            <button onClick={handlelogout} className="dropdown-item">
              Log out
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
