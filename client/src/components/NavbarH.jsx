import React from "react";
import { connect } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from '../image/logo.png'

const NavbarH = ({ user }) => {
  return (
    <Navbar style={{ backgroundColor: "#fff" }}>
      <Navbar.Brand href="/" style={{ color: "#e11" }}>
        <img src={logo} alt="logo" style={{width:'180px',height:'30.5px'}}/>
      </Navbar.Brand>
      <Navbar.Toggle />
      {user.loginSuccess === false || user.loginSuccess === undefined ? (
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/signup">Signup</Nav.Link>
        </Navbar.Collapse>
      ) : (
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link onClick={() => alert("Logout")}>Logout</Nav.Link>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(NavbarH);
