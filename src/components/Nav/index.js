import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";

import { Container, Content } from "./styles";

function Nav_() {
  const [token, setToken] = useState("");
  let localToken = localStorage.getItem("token");

  useEffect(() => {
    localToken = localStorage.getItem("token");
    setToken(localToken);
  }, [localStorage.getItem("token")]);

  return (
    <Container>
      <Content>
        <Navbar collapseOnSelect expand="lg" variant="dark" className="navBar">
          <Navbar.Brand href="/" className="logoContainer">
            FGAConnect
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto navLinks">
              <Nav.Link href="/groups" className="mr-3">
                Grupos
              </Nav.Link>
              {
                token ? (
                  <Nav.Link href="/profile" >
                    Meu Perfil
                  </Nav.Link>
                ) : (
                  <Nav.Link href="/auth">
                    Login/Cadastro
                  </Nav.Link>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Content>
    </Container>
  );
}

export { Nav_ };
