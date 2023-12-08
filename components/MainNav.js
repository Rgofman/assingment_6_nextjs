import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Nav, Navbar, Form, Button } from 'react-bootstrap';
import Link from 'next/link';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { readToken, removeToken } from '@/lib/authenticate';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';

export default function MainNav() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [searchField, setSearchField] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  let token = readToken();

  function logout() {
    setIsExpanded(false)
    removeToken()
    router.push(`/login`)
  }

  const handleSearchSubmit = async (e) => {
    setIsExpanded(false)
    e.preventDefault();
    if (searchField) {
      const queryString = `title=true&q=` + searchField
      setSearchHistory(await addToHistory(`title=true&q=${searchField}`))
      router.push(`/artwork?title=true&q=` + searchField);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="fixed-top navbar-dark bg-dark" navbarscroll="true" expanded={isExpanded}>
        <Container>
          <Navbar.Brand href="">Ruslan Gofman</Navbar.Brand>
          <Navbar.Toggle onClick={() => setIsExpanded(!isExpanded)} aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior><Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === "/"}>Home</Nav.Link></Link>
              {token && <Link href="/search" passHref legacyBehavior><Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === "/search"}>Advanced Search</Nav.Link></Link>}
            </Nav>
            <Nav>
              {!token && <Link href="/register" passHref legacyBehavior><Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === "/register"}>Register</Nav.Link></Link>}
              {!token && <Link href="/login" passHref legacyBehavior><Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === "/login"}>Login</Nav.Link></Link>}
            </Nav>
            &nbsp;
            {token && <Form className="d-flex" onSubmit={handleSearchSubmit}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              />
              <Button type="submit" variant="success">Search</Button>
            </Form>}
            &nbsp;
            {token && <Nav>
              <NavDropdown id="nav-dropdown-dark-example" title={token.userName} menuVariant="dark">
                <Link href="/favourites" passHref><NavDropdown.Item href="/favourites" active={router.pathname === "/favourites"} onClick={() => setIsExpanded(false)}>Favourites</NavDropdown.Item> </Link>
                <Link href="/history" passHref><NavDropdown.Item href="/history" active={router.pathname === "/history"} onClick={() => setIsExpanded(false)}>Search History</NavDropdown.Item> </Link>
                <Link href="/history" passHref><NavDropdown.Item href="/login" active={router.pathname === "/login"} onClick={() => { setIsExpanded(false); logout(); }}>Logout</NavDropdown.Item> </Link>
              </NavDropdown>
            </Nav>}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
