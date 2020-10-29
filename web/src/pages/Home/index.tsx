import React, { useState } from 'react';
import './style.css';
import { FaSearch } from 'react-icons/fa';
import Header from '../Header';
import { Container, Row, Col, Button } from 'reactstrap';
import FilterPoint from '../FilterPoint'

const Home = () => {
  const [modalFilterPoint, setModalFilterPoint] = useState<boolean>(false);

  function toggleModalFilterPoint(modal: boolean = true) {
    setModalFilterPoint(modal);
  }

  return (
    <div className="page-home">
      <Container className="position-relative">
        <Header pageName="home"/>
        <main className="d-flex align-items-center">
        <Row className="w-100 no-gutters">
          <Col xs="12" className="text-center text-lg-left">
            <h2>Find a recycling point <br className="d-none d-lg-block"/>nearby.</h2>
            <p>We help people find a collection point efficiently.</p>
            <Button className="btn btn-lg btn-find" onClick={() => toggleModalFilterPoint()}>
              <span><FaSearch /></span>
              <strong className="pl-2">Find a Collection Point</strong>
            </Button>
          </Col>
        </Row>
        </main>
      </Container>
      <FilterPoint modal={modalFilterPoint} toggleModalFilterPoint={toggleModalFilterPoint}/>
    </div>
  );
}

export default Home;
