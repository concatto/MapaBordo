import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, Row, Col } from 'react-bootstrap';
import { push } from 'react-router-redux';
import { Link, withRouter } from 'react-router-dom';
import React from 'react';

class NavigationBar extends React.Component {
  handleSelect(key, e) {
    e.preventDefault();
    this.props.push(key);
  }

  render() {
    let path = this.props.location.pathname;
    const idx = path.indexOf("/", 1);

    if (idx > 0) {
      path = path.substring(0, idx);
    }

    const pages = {
      insert: "/cadastrar",
      query: "/visualizar",
      summaries: "/relatorios",
      about: "/sobre"
    };

    return (
      <Navbar fixedTop fluid inverse>
        <Row>
          <Col xs={10} xsOffset={1}>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Borealis</Link>
              </Navbar.Brand>

              <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav onSelect={(key, e) => this.handleSelect(key, e)} activeKey={path}>
                <NavItem eventKey={pages.insert} href={pages.insert}>Cadastrar</NavItem>
                <NavItem eventKey={pages.query} href={pages.query}>Visualizar</NavItem>
                <NavItem eventKey={pages.summaries} href={pages.summaries}>Relatórios</NavItem>
              </Nav>
              <Nav onSelect={(key, e) => this.handleSelect(key, e)} activeKey={path} pullRight>
                <NavItem eventKey={pages.about} href={pages.about}>Sobre</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Row>
      </Navbar>
    );
  }
}

const stateMapper = (state, ownProps) => ({
  ...ownProps,
});

export default withRouter(connect(stateMapper, {push})(NavigationBar));
