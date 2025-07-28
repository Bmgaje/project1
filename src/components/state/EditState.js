/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Urls } from '../../helpers/Urls';
import { useParams } from 'react-router-dom';
import Notification from '../Widgets/Statistic/Notification';

function EditState() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');

  const [countryData, setCountryData] = useState([]);

  const params = useParams();
  let [statusUpdate, setStatusUpdate] = useState(false);

  const fetch = () => {
    axios
      .get(Urls.get.countries)
      .then((res) => {
        setCountryData(res.data?.getAllCountries.docs);
      })
      .catch((err) => {
        console.log(err);
      });
    axios.get(Urls.get.states + '/' + params.id).then((response) => {
      console.log(response.data);
      setTitle(response.data?.getState?.title);
      setCountry(response.data?.getState?.country);
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  const update = (e) => {
    e.preventDefault();

    const payload = {
      country: country,
      title
    };

    axios.put(Urls.put.updateState + '/' + params.id, payload).then((res) => {
      if (res.data.status === 'success') {
        setStatusUpdate(true);

        setTimeout(() => {
          setStatusUpdate(false);
          navigate('/masters/state');
        }, 2000);
      }
    });
  };

  const handleChange = (e) => {
    console.log(e.target);
    setCountry(e.target.value);
  };
  return (
    <>
      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {statusUpdate ? (
            <b>
              <Notification message="Data updated Successfully." />
            </b>
          ) : null}
        </div>
      </div>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Update State</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={update}>
                <Row>
                  <Form.Group className="mb-3" as={Col} md="6" controlId="exampleForm.ControlSelect1">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Select Country</Form.Label>
                    <Form.Select required={true} as="select" value={country} onChange={handleChange} placeholder="Select Country">
                      <option value={''}>Select Country</option>
                      {countryData.map((item, index) => {
                        return (
                          <option key={index} value={item._id}>
                            {item.title}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>State Name</Form.Label>
                    <Form.Control
                      defaultValue={title}
                      required
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter State Name"
                    />
                  </Form.Group>
                </Row>

                <Col xs="auto" className="my-1">
                  <Button type="submit" variant="primary" size="sm">
                    Update
                  </Button>
                  <Link to={'/masters/state'}>
                    <Button variant="danger" as="btn" size="sm">
                      Cancel
                    </Button>
                  </Link>
                </Col>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default EditState;
