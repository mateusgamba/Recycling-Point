import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { City } from './types';

const CardDetail = ({ country, closeModalFilterPoint }) => {
  const history = useHistory();

  function pageToPoints(country: string, city: string) {
    history.push(`/points?country=${country}&city=${city}`);
    closeModalFilterPoint();
  }

  return (
    <Card className="border-0">
      <p className="card-header bg-transparent pl-1 font-weight-bold">
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
  );
}

export default CardDetail;