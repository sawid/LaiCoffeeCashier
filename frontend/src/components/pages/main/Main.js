import React from "react";
import { Button, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import "./main.styles.scss";
const Main = () => {
  return (
    <div>
      <Navbar className="navBarBackground text-light" expand="lg">
        <Container className="">
          <Navbar.Brand className="text-light">
            ระบบเครื่องคิดเงิน<b>ไลคอฟฟี่</b>{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="text-light" href="/cashier">
                เครื่องคิดเงิน
              </Nav.Link>
              <Nav.Link className="text-light" href="#link">
                สต็อควัตถุดิบ
              </Nav.Link>
              <Nav.Link className="text-light" href="#link">
                สรุปยอดขายวันนี้
              </Nav.Link>
              <Nav.Link className="text-light" href="#link">
                จัดการเมนู
              </Nav.Link>
              <Nav.Link className="text-light" href="#link">
                ตารางลูกค้า
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Main;
