import React from 'react';
import { Badge, Button, Card, CardImg, CardBody } from 'reactstrap';
import { FaPaperPlane } from 'react-icons/fa';
import { Point } from '../../types/Point';
import { ItemPoint } from '../../types/ItemPoint';

interface CardDetailProps {
  point: Point;
  toggleModalMap: Function;
}

const CardDetail: React.FC<CardDetailProps> = ({ point, toggleModalMap }) => {
  function showMap(point: Point): void {
    toggleModalMap(true, point);
  }

  return (
    <Card>
      <div className="card-header">
        <h5>{point.name}</h5>
      </div>
      <CardImg top width="100%" src={`${point.image_url}`} alt={`${point.name}`} />
      <CardBody>
        <p>
          {point.Items?.map((item: ItemPoint) => (
            <Badge color="primary" className="badge-recycle" key={item.id}>
              {item.name}
            </Badge>
          ))}
        </p>
        {point.number && (
          <p>
            <strong>Number</strong>: {point.number}
          </p>
        )}
        <p>
          <strong>Street name:</strong> {point.street}
        </p>
        <p>
          <strong>City:</strong> {point.city}
        </p>
        {point.province && (
          <p>
            <strong>Province</strong>: {point.province}
          </p>
        )}
        <p>
          <strong>Country</strong>: {point.country}
        </p>
        {point.zip && (
          <p>
            <strong>Zip</strong>: {point.zip}
          </p>
        )}
        <p>
          <strong>Whatsapp</strong>:{point.whatsapp}
          <a
            href={`https://api.whatsapp.com/send?phone=${point.whatsapp}`}
            title="Whatsapp"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaPaperPlane className="link-whatsapp" />
          </a>
        </p>
      </CardBody>
      <div className="card-footer">
        <Button className="btn btn-primary btn-block" onClick={(): void => showMap(point)}>
          Show on the Map
        </Button>
      </div>
    </Card>
  );
};

export default CardDetail;
