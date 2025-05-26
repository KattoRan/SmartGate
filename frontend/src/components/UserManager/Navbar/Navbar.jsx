import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BsListUl, BsPlusCircle } from "react-icons/bs";
import "./Navbar.css";
function ListAddNavbar() {
  return (
    <Navbar bg="light" variant="light" expand="md">
      <Container className="nav-container">
        <Navbar.Toggle aria-controls="list-add-navbar" hidden />
        <Navbar.Collapse id="list-add-navbar">
          <Nav className="header-nav">
            <Nav.Link as={NavLink} to="/users">
              <BsListUl size={22} />
              Danh sách
            </Nav.Link>

            <Nav.Link as={NavLink} to="/users/add-user">
              <BsPlusCircle size={22} />
              Thêm mới
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default ListAddNavbar;
