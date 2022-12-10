import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
  return (
    <div className="footer_container">
      <Container>
        <Row>
          <Col md={6} xs={12}>
            <div className="footer_logo_container">
            <img height="30"  src={require('../images/Logos/nu-moves-high-resolution-logo-transparent-background.png')} />
              <p className="footer_description">
                All Your Household Needs Under One Roof
              </p>
            </div>
          </Col>
          <Col md={3} xs={4}>
            {/* <h5 className="about_us_heading">About Us</h5> */}
            <ul className="navlinks">
              <li className="navlink">
                <a href="#/">Terms & Conditions</a>
              </li>
              <li className="navlink">
                <a href="#/">Privacy Policy</a>
              </li>
              <li className="navlink">
                <a href="#/">Blog</a>
              </li>
              {/* <li className="navlink">
                <a href="#/">About</a>
              </li>
              <li className="navlink">
                <a href="#/">Blog</a>
              </li>
              <li className="navlink">
                <a href="#/">Contact</a>
              </li> */}
            </ul>
          </Col>
          <Col md={3} xs={8}>
            <h5 className="about_us_heading">About Us</h5>
            <ul className="navlinks">
              <li className="nav_li">
                <p className="navlink">+880-2-9898796</p>
              </li>
              <li className="nav_li">
                <p className="navlink">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </li>
              <li className="nav_li">
                <p className="navlink">company@gmail.com</p>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Footer
