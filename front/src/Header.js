import logo from "./img/logo.png"
import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import PopupPanier from "./PopupPanier";

function Header() {

    const [bouton, setBouton] = useState()
    const [role, setRole] = useState()
    const [fonctionnalites, setFonctionnalites] = useState()

    useEffect(() => {
        setRole(sessionStorage.getItem("role"))
        if (role == 'admin') {
            setBouton(<a class="nav-link" href="/" onClick={() => { sessionStorage.clear() }}>Deconnexion</a>)
            setFonctionnalites(
                <Nav>
                    <Nav.Link href="/ListeMembres">Membres</Nav.Link>
                    <Nav.Link href="/ListeSorties"> Sorties</Nav.Link>
                    <Nav.Link href="/ListeOptions"> Options</Nav.Link>
                </Nav>
            )
        } else if (role == 'membre') {

                setBouton(<Nav.Link href="/" onClick={() => { sessionStorage.clear() }}>Deconnexion</Nav.Link>)
                setFonctionnalites(
                    <Nav>
                        <Nav.Link href="/ListeSorties"> Sorties</Nav.Link>
                        <Nav.Link href="/ListeInscriptions">Inscriptions</Nav.Link>
                        <Nav.Link><PopupPanier/></Nav.Link>
                    </Nav>
                )
        } else {

                setBouton(<Nav.Link href="/Connexion">Connexion</Nav.Link>)
        }
    }, [role])


    return (
        <div>

            <Navbar collapseOnSelect expand="lg mb-4" bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={logo} alt="Logo" width="170" height="60" class="d-inline-block align-text-top" />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {fonctionnalites}
                        </Nav>
                        <Nav>
                            {bouton}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>

    );
}


export default Header;