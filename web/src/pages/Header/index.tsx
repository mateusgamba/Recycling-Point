import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
import logo from '../../assets/image/recycling-point-logo.png';

interface HeaderProps {
  pageName?: string;
}

const Header: React.FC<HeaderProps> = ({ pageName }) => {
  const history = useHistory();

  function pageTo(page: string): void {
    history.push(page);
  }

  return (
    <div className="d-flex align-items-center flex-row navbar">
      <div className="w-100">
        <Row noGutters>
          <Col className="d-flex justify-content-center justify-content-lg-start col-12 col-lg-6 pb-3 py-lg-0">
            <Link to="/">
              <img src={logo} alt="Recycling Point" className="logo" />
            </Link>
          </Col>
          <Col className="d-flex justify-content-center justify-content-lg-end col-12 col-lg-6">
            {pageName === 'home' ? (
              <Button color="primary btn-register" onClick={(): void => pageTo('/create-point')}>
                Register a Point
              </Button>
            ) : (
              <Button outline color="secondary btn-recycle" onClick={(): void => pageTo('/')}>
                Home
              </Button>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Header;
