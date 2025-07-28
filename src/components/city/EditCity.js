/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Urls } from '../../helpers/Urls';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Notification from '../Widgets/Statistic/Notification';

function EditCity() {
  const navigate = useNavigate();
  const params = useParams();
  const [__City, setCity] = useState('');
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [stateId, setStateId] = useState([]);
  // const [_data, setData] = useState([]);
  const [countryId, setcountryId] = useState();
  let [statusUpdate, setStatusUpdate] = useState(false);

  const fetchCountry = () => {
    axios.get(Urls.get.countries).then((res) => {
      setCountryData(res.data?.getAllCountries?.docs);
    });
  };

  useEffect(() => {
    fetchCountry();
    fetchCity();
  }, []);

  const fetchCity = () => {
    axios.get(Urls.get.cities + '/' + params.id).then((res) => {
      console.log('city:)', res);

      setCity(res.data?.getCity?.title);
      let data = res.data?.getCity;
      setStateId(data?.state?._id);
      setcountryId(data?.country);
    });
  };

  const add = (e) => {
    e.preventDefault();
    const payload = {
      country: countryId,
      state: stateId,
      title: __City
    };
    axios.put(Urls.put.updateCity + params.id, payload).then((res) => {
      if (res.data.status === 'success') {
        setStatusUpdate(true);

        setTimeout(() => {
          setStatusUpdate(false);
          navigate('/masters/city');
        }, 2000);
      }
    });
  };

  const handleChange = (e) => {
    setcountryId(e.target.value);
  };

  useEffect(() => {
    axios.get(Urls.get.states + `?is_delete=no&country=` + countryId).then((res) => {
      setStateData(res.data?.getAllStates?.docs);
    });
  }, [countryId]);

  const handleStateChange = (e) => {
    setStateId(e.target.value);
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
              <Card.Title as="h5">Edit City</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={add}>
                <Row>
                  <Form.Group className="mb-3" as={Col} md="6" controlId="exampleForm.ControlSelect1">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Select Country</Form.Label>
                    <Form.Select required={true} as="select" value={countryId} onChange={handleChange} placeholder="Select Country">
                      <option value={''}>Select Country</option>
                      {countryData?.map((item, index) => {
                        return (
                          <option key={index} value={item._id}>
                            {item.title}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" as={Col} md="6" controlId="exampleForm.ControlSelect1">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Select State</Form.Label>
                    <Form.Select required={true} as="select" value={stateId} onChange={handleStateChange} placeholder="Select Country">
                      <option value={''}>Select State</option>
                      {stateData?.map((item, index) => {
                        return (
                          <option key={index} value={item._id}>
                            {item.title}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>City Name</Form.Label>
                    <Form.Control
                      defaultValue={__City}
                      required
                      onChange={(e) => {
                        setCity(e.target.value);
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
                  <Link to={'/masters/city'}>
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

export default EditCity;
