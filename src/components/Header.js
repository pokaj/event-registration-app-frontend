import { React, Component } from 'react';
import {Navbar, Nav } from 'react-bootstrap';
import { BsPower } from "react-icons/bs";


class Header extends Component{
    state = {
      user: JSON.parse(localStorage.getItem('user'))
    }
    
    logout = (e) => {
      localStorage.clear();
      window.location.href = "/";
    }
    
    render(){
        return(
          <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Navbar.Brand href="#home">Welcome {this.state.user.username}</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link href="/myevents">My Events </Nav.Link>
                  <Nav.Link href="/profile">My Profile </Nav.Link>
                </Nav>
                <BsPower style={{color: "red"}}></BsPower>
                <Nav>
                  <Nav.Link href="#logout" onClick={this.logout}>Logout</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </>
        )
    }
}

export default Header;