import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Card, CardBody } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { Country, City } from './types';
import api from '../../services/api';

const FilterPoint = ({modal, toggleModalFilterPoint}) => {
  const history = useHistory();

  const [countries, setCountries] = useState<Country[]>([]);

  function closeModalFilterPoint() {
    toggleModalFilterPoint(false)
  }

  function pageToPoints(country, city) {
    history.push(`/points?country=${country}&city=${city}`);
    closeModalFilterPoint();
  }

  useEffect(() => {
    api.get('points/cities').then(response => {
      const countriesSerialized: any = [];
      Object.keys(response.data).forEach(string => {
        countriesSerialized.push({
          "name": string,
          "cities": response.data[string]
        });
      });
      setCountries(countriesSerialized);
    });
  }, []);

  return (
    <Modal isOpen={modal} toggle={closeModalFilterPoint}>
      <ModalHeader toggle={closeModalFilterPoint}>Choose a city</ModalHeader>
      <ModalBody>
        <Row>
          {countries.map((country: Country) => (
            <Col sm="12" lg="6" className="mb-5" key={country.name}>
              <Card className="border-0">
                <p className="card-header bg-transparent pl-1" style={{fontWeight:700}}>
                  {country.name}
                </p>

                <CardBody className="p-0">
                  <ul className="list-group list-group-flush">
                    {country.cities.map((city: City) => (
                      <li className="list-group-item pl-1" key={city.city}>
                        <button className="btn btn-link p-0 cursor-pointer" onClick={() =>pageToPoints(country.name, city.city) }>
                          {city.city}
                        </button>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={closeModalFilterPoint}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}

export default FilterPoint;