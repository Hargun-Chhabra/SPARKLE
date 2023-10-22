// Neha Dadarwala - neha.dadarwala@dal.ca

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useNavigate} from "react-router-dom";
import './Navbar.css';


function CollapsibleExample() {
  const navigate = useNavigate();


  return (
    <Navbar collapseOnSelect expand="lg" className="color-nav" variant="light" >
      <Container >
        <Navbar.Brand href="/Profile">Sparkle</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Orders" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/SearchPage">In store purchase</NavDropdown.Item>
              <NavDropdown.Item href="/specialOrder">Special Order</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/refund">Refund</Nav.Link>
            <Nav.Link href="/createRepair">Repair</Nav.Link>
            
            <NavDropdown title="Track" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/trackRepair">Repair</NavDropdown.Item>
              <NavDropdown.Item href="/trackSpecialOrders" >Special Order</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Inventory" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/viewStock">View Stock</NavDropdown.Item>
              <NavDropdown.Item href="/modifyStock/false" >Add/Modify Stock</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="User Management" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/Register">Add Employee</NavDropdown.Item>
              <NavDropdown.Item href="/emplist">View Employee List</NavDropdown.Item>
              <NavDropdown.Item href="/logout">logout</NavDropdown.Item>
              
              {/* <NavDropdown.Divider /> */}
            </NavDropdown>
            <Nav.Link href="/salesReport">Sales Report</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  
  );
}

export default CollapsibleExample;
