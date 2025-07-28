/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Urls } from '../../helpers/Urls';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../Widgets/Statistic/Notification';

function AddState() {
  const navigate = useNavigate();
  const [__state, setState] = useState('');
  const [countryId, setCountryId] = useState('');
  const [countryData, setCountryData] = useState([]);
  let [error, setError] = useState(false);
  let [addStatus, setAddStatus] = useState(false);

  const fetchCountry = () => {
    axios
      .get(Urls.get.countries)
      .then((res) => {
        setCountryData(res.data?.getAllCountries.docs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  function add(e) {
    e.preventDefault();
    if (__state.length == 0) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else if (__state.length > 0) {
      const payload = {
        country: countryId,
        title: __state
      };
      axios.post(Urls.post.addstate, payload).then(() => {
        setAddStatus(true);
        setTimeout(() => {
          setAddStatus(false);
          navigate('/masters/state');
        }, 2000);
      });
    }
  }

  // const add = (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     country: countryId,
  //     title: __state
  //   };
  //   axios.post(Urls.post.addstate, payload).then((res) => {
  //     if (res.data.status === 'success') {
  //       navigate('/masters/state');
  //     }
  //   });
  // };

  const handleChange = (e) => {
    console.log(e.target);
    setCountryId(e.target.value);
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
              <Notification message="State added successfully." />
            </b>
          ) : null}
        </div>
      </div>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add State</Card.Title>
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
                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>
                      State Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        setState(e.target.value);
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

export default AddState;
