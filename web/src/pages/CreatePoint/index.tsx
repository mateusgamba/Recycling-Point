import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '../../services/api';
import Header from '../Header';
import Dropzone from '../../components/Dropzone';
import { Point } from '../../types/Point';
import { ItemPoint } from '../../types/ItemPoint';
import { Country } from '../../types/Country';
import './style.css';

interface InputErrors {
  city?: [];
  country?: [];
  email?: [];
  items?: [];
  name?: [];
  street?: [];
  whatsapp?: [];
}

// interface ServerError {
//   code: string;
//   description: string;
// }

const CreatePoint: React.FC = () => {
  const [items, setItems] = useState<ItemPoint[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [formData, setFormData] = useState<Point>({
    name: '',
    email: '',
    whatsapp: '',
    zip: '',
    street: '',
    number: '',
    city: '',
    province: '',
    country: '',
  });
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [error, setError] = useState<InputErrors>();
  const [btnSave, setBtnSave] = useState<boolean>(false);

  const history = useHistory();

  useEffect(() => {
    api.get('items').then((response) => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('countries').then((response) => {
      setCountries(response.data);
    });
  }, []);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSelectItem(id: number): void {
    const alreadySelected = selectedItems.findIndex((item) => item === id);
    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  function notify(type: number, message: string): void {
    if (type) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  }

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    const { name, email, whatsapp, zip, street, number, city, province, country } = formData;
    const items = selectedItems;

    const data = new FormData();

    data.append('name', name);
    data.append('email', email);
    data.append('whatsapp', whatsapp);
    data.append('zip', zip);
    data.append('street', street);
    data.append('number', String(number));
    data.append('city', city);
    data.append('province', province);
    data.append('country', country);
    data.append('items', items.join(','));

    if (selectedFile) {
      data.append('image', selectedFile);
    }

    setBtnSave(true);

    api
      .post('points', data)
      .then(() => {
        notify(1, 'Thank you for subscribing!');
        history.push('/');
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 400) {
          const errorData = error.response.data.errors;
          setError(errorData);
          window.scrollTo(0, 0);
          notify(0, 'Please check the indicated fields and fix any errors before continuing.');
        }
        setBtnSave(false);
      });
  }

  return (
    <>
      <div className="page-create-point-background"></div>
      <Container className="position-relative page-create-point">
        <Header />
        <Form onSubmit={handleSubmit}>
          <h3>Register your Recycling Point</h3>
          <legend className="my-4">
            <h4>Enter Information</h4>
          </legend>

          <FormGroup>
            <Label for="name" className={error?.name && `text-danger`}>
              Personal or Company name
            </Label>
            <Input name="name" onChange={handleInputChange} invalid={error?.name ? true : false} />
            <FormFeedback>{error?.name}</FormFeedback>
          </FormGroup>

          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="email" className={error?.email && `text-danger`}>
                  E-mail
                </Label>
                <Input name="email" onChange={handleInputChange} invalid={error?.email ? true : false} />
                <FormFeedback>{error?.email}</FormFeedback>
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="whatsapp" className={error?.name && `text-danger`}>
                  Whatsapp
                </Label>
                <Input name="whatsapp" onChange={handleInputChange} invalid={error?.whatsapp ? true : false} />
                <FormFeedback>{error?.whatsapp}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>

          <legend className="my-4">
            <h4>Enter Address</h4>
          </legend>

          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label for="number">Number</Label>
                <Input type="number" name="number" onChange={handleInputChange} />
              </FormGroup>
            </Col>
            <Col md={8}>
              <FormGroup>
                <Label for="street" className={error?.street && `text-danger`}>
                  Street name
                </Label>
                <Input name="street" onChange={handleInputChange} invalid={error?.street ? true : false} />
                <FormFeedback>{error?.street}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="zip">Zip Code or PostCode</Label>
                <Input name="zip" onChange={handleInputChange} />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="city" className={error?.city && `text-danger`}>
                  City
                </Label>
                <Input name="city" onChange={handleInputChange} invalid={error?.city ? true : false} />
                <FormFeedback>{error?.city}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="province">State/Province</Label>
                <Input name="province" onChange={handleInputChange} />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label for="country" className={error?.country && `text-danger`}>
                  Country
                </Label>
                <Input
                  type="select"
                  name="country"
                  onChange={handleInputChange}
                  invalid={error?.country ? true : false}
                >
                  <option value="">Select a Country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </Input>
                <FormFeedback>{error?.country}</FormFeedback>
              </FormGroup>
            </Col>
          </Row>

          <legend className="my-4">
            <h4>Items</h4>
          </legend>

          <p>Select one or more items below</p>
          <p className="text-danger">{error?.items && 'At least one selected item is required.'}</p>
          <ul className="items-grid">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={(): void => handleSelectItem(item.id)}
                className={selectedItems.includes(item.id) ? 'selected' : ''}
              >
                <img src={item.image_url} alt={item.name} />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>

          <legend className="my-4">
            <h4>Picture</h4>
          </legend>

          <Dropzone onFileUploaded={setSelectedFile} />

          <div className="my-4 d-flex justify-content-end">
            <button type="submit" className="btn btn-primary btn-lg px-5 btn-sm-block" disabled={btnSave}>
              {btnSave && <span className="spinner-border mr-2" style={{ width: '1.5rem', height: '1.5rem' }}></span>}
              Save
            </button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default CreatePoint;
