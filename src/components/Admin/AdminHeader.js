import { React, Component } from 'react';
import {Navbar, Nav } from 'react-bootstrap';
import { BsPower } from "react-icons/bs";


class AdminHeader extends Component{
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
              <Navbar.Brand href="#home">Hello {this.state.user.username}</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/admin-dashboard">Dashboard</Nav.Link>
                  <Nav.Link href="/addevent">Add Event </Nav.Link>
                  <Nav.Link href="/eventdetails">Event Details </Nav.Link>
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

export default AdminHeader;