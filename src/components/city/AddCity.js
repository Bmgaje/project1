/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Urls } from '../../helpers/Urls';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../Widgets/Statistic/Notification';

function AddCity() {
  const navigate = useNavigate();
  const [__City, setCity] = useState('');
  const [countryId, setCountryId] = useState('');
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [stateId, setStateId] = useState([]);

  let [error, setError] = useState(false);
  let [addStatus, setAddStatus] = useState(false);

  const fetchCountry = () => {
    axios.get(Urls.get.countries).then((res) => {
      setCountryData(res.data?.getAllCountries.docs);
    });
  };

  useEffect(() => {
    axios.get(Urls.get.states + `?is_delete=no&country=` + countryId).then((res) => {
      setStateData(res.data?.getAllStates?.docs);
    });
  }, [countryId]);

  useEffect(() => {
    fetchCountry();
  }, []);

  function add(e) {
    e.preventDefault();
    if (!__City.length) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else if (__City.length > 0) {
      const payload = {
        country: countryId,
        state: stateId,
        title: __City
      };
      axios.post(Urls.post.addcity, payload).then(() => {
        setAddStatus(true);
        setTimeout(() => {
          setAddStatus(false);
          navigate('/masters/city');
        }, 2000);
      });
    }
  }

  // const add = (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     country: countryId,
  //     state: stateId,
  //     title: __City
  //   };
  //   axios.post(Urls.post.addcity, payload).then((res) => {
  //     if (res.data.status === 'success') {
  //       navigate('/masters/city');
  //     }
  //   });
  // };

  const handleChange = (e) => {
    setCountryId(e.target.value);
  };
  const handleStateChange = (e) => {
    setStateId(e.target.value);
  };

  return (
    <>
      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {error ? (
            <b>
              <Notification message="Please this * field is required !" />
            </b>
          ) : null}
        </div>
      </div>

      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {addStatus ? (
            <b>
              <Notification message="City added successfully." />
            </b>
          ) : null}
        </div>
      </div>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add City</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={add}>
                <Row>
                  <Form.Group className="mb-3" as={Col} md="6" controlId="exampleForm.ControlSelect1">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>
                      Select Country <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select required={true} as="select" onChange={handleChange} placeholder="Select Country">
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
                  <Form.Group className="mb-3" as={Col} md="6" controlId="exampleForm.ControlSelect1">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>
                      Select State <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select required={true} as="select" onChange={handleStateChange} placeholder="Select Country">
                      <option value={''}>Select State</option>
                      {stateData.map((item, index) => {
                        return (
                          <option key={index} value={item._id}>
                            {item.title}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>
                      City Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
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
                    Add State
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

export default AddCity;
