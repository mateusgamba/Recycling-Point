import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import queryString from 'query-string';
import api from '../../services/api';
import Header from '../Header';
import CardDetail from './CardDetail';
import ModalMap from './ModalMap';
import FilterBarCity from './FilterBarCity';
import { Point } from '../../types/Point';
import './style.css';

interface Search {
  search?: string;
}

interface PointsProps {
  location?: Search;
}

const Points: React.FC<PointsProps> = ({ location }) => {
  const [points, setPoints] = useState<Point[]>([]);
  const [modalMap, setModalMap] = useState<boolean>(false);
  const [pointModalMap, setPointModalMap] = useState<Point>();
  const [city, setCity] = useState<string>();

  useEffect(() => {
    const params = queryString.parse(location?.search ?? '');
    api
      .get('points', {
        params,
      })
      .then((response) => {
        setPoints(response.data);
      });

    setCity(`${params.city} (${params.country})`);
  }, [location?.search]);

  function toggleModalMap(modal = true, point?: Point): void {
    setModalMap(modal);
    if (point) {
      setPointModalMap(point);
    }
  }

  return (
    <>
      <div className="page-points-background"></div>
      <Container className="position-relative page-points">
        <Header />
        <main>
          <FilterBarCity points={points.length} city={city} />
          <Row>
            {points.map((point: Point) => (
              <Col sm="12" lg="6" className="mb-5 d-flex align-items-stretch" key={point.id}>
                <CardDetail point={point} toggleModalMap={toggleModalMap} />
              </Col>
            ))}
          </Row>
        </main>
        <ModalMap modal={modalMap} toggleModalMap={toggleModalMap} point={pointModalMap} />
      </Container>
    </>
  );
};

export default Points;
