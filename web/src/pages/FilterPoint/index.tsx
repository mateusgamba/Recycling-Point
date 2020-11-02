import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row } from 'reactstrap';
import { Country } from './types';
import api from '../../services/api';
import CardDetail from './CardDetail';

const FilterPoint = ({modal, toggleModalFilterPoint}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [load, setLoad] = useState<boolean>(false);

  function closeModalFilterPoint() {
    toggleModalFilterPoint(false)
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
      setLoad(true);
    });
  }, []);

  return (
    <Modal isOpen={modal} toggle={closeModalFilterPoint}>
      <ModalHeader toggle={closeModalFilterPoint}>Choose a city</ModalHeader>
      <ModalBody>
        <Row>
          {load ?
            countries.map((country: Country) => (
              <Col sm="12" lg="6" className="mb-5" key={country.name}>
                <CardDetail country={country} closeModalFilterPoint={closeModalFilterPoint} />
              </Col>
            )) : (
              <Col sm="12" className="my-3">
                <div className="d-flex justify-content-center">
                  <div className="spinner-border">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              </Col>
            )
          }
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={closeModalFilterPoint}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}

export default FilterPoint;