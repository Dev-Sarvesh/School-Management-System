import React from "react";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <footer className="footer px-0 px-lg-3">
      <Container fluid>
        <nav>
          <ul className="footer-menu">
            {[
              { label: "Home", href: "#" },
              { label: "About Us", href: "#" },
              { label: "Portfolio", href: "#" },
              { label: "Blog", href: "#" },
            ].map((item, index) => (
              <li key={index}>
                <a href={item.href} onClick={(e) => e.preventDefault()}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="copyright text-center">
            © {new Date().getFullYear()}{" "}
            <a href="#">School Management System</a>, made with love for a better Management.
          </p>
        </nav>
      </Container>
    </footer>
  );
}

export default Footer;
