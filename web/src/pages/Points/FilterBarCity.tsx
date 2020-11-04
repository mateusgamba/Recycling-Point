import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { BsFillCaretDownFill } from 'react-icons/bs';
import FilterPoint from '../FilterPoint';

interface FilterBarCityProps {
  city?: string;
  points: number;
}

const FilterBarCity: React.FC<FilterBarCityProps> = ({ city, points }) => {
  const [modalFilterPoint, setModalFilterPoint] = useState<boolean>(false);

  function toggleModalFilterPoint(modal = true): void {
    setModalFilterPoint(modal);
  }

  return (
    <Row className="filter">
      <Col>
        <button
          className="btn btn-link d-flex align-items-center link-city cursor-pointer"
          onClick={(): void => toggleModalFilterPoint()}
        >
          <FaMapMarkerAlt className="filter-icon-localtion" />
          <p className="my-0 px-1">City: {city}</p>
          <BsFillCaretDownFill />
        </button>
      </Col>
      <Col className="text-right">
        {points} recycling point{points > 1 ? 's' : ''} found
      </Col>
      <FilterPoint modal={modalFilterPoint} toggleModalFilterPoint={toggleModalFilterPoint} />
    </Row>
  );
};

export default FilterBarCity;
