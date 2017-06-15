import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Row, Col, Image } from 'react-bootstrap';
import React from 'react';

const NavigationBar = (props) => {
  return (
    <Navbar fixedTop fluid inverse>
      <Row>
        <Col xs={10} xsOffset={1}>
          <Navbar.Header>
            <Navbar.Brand>
              <span>Borealis</span>
            </Navbar.Brand>

            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem>Cadastrar</NavItem>
              <NavItem>Visualizar</NavItem>
              <NavDropdown title="Relatórios">
                <MenuItem>Atividade Geral</MenuItem>
                <MenuItem>Embarcações</MenuItem>
                <MenuItem>Capturas</MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem>Sobre</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Col>
      </Row>
    </Navbar>
  );
};

const stateMapper = (state) => ({
  test: "Hello!"
});

export default connect(stateMapper)(NavigationBar);
