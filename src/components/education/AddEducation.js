/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Urls } from '../../helpers/Urls';
import Notification from '../Widgets/Statistic/Notification';
import Select from 'react-select';

function AddEducation() {
  const [education, setEducation] = useState('');
  let [error, setError] = useState(false);
  let [addStatus, setAddStatus] = useState(false);
  const navigate = useNavigate();
  let [errorMsgRepeated, setErrorMsgRepeated] = useState(false);

  const [countryId, setCountryId] = useState('');
  const [countryData, setCountryData] = useState([]);

  let [searchEducation, setSearchEducation] = useState('');
  let educationLimit = 50;

  function allCountry() {
    axios.get(Urls.get.countries + `?limit=${educationLimit}&q=${searchEducation}`).then((res) => {
      console.log('All Countries:)', res);
      setCountryData(res?.data?.getAllCountries?.docs || []);
    });
  }

  useEffect(() => {
    allCountry();
  }, [searchEducation]);

  // const handleChange = (e) => {
  //   console.log("country id", e.target.value);
  //   setCountryId(e.target.value);
  // };

  const handleEducationChange = (countryId) => {
    setCountryId(countryId.value);
  };

  const handleSearchInput = (inputS) => {
    setSearchEducation(inputS);
  };

  function add(e) {
    e.preventDefault();
    if (!education || !countryId) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else {
      const payload = {
        title: education,
        country: countryId
      };

      axios
        .post(Urls.post.addeducation, payload)
        .then(() => {
          setAddStatus(true);
          setTimeout(() => {
            setAddStatus(false);
            navigate('/masters/Education');
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          setErrorMsgRepeated(true);
          setTimeout(() => {
            setErrorMsgRepeated(false);
          }, 2000);
        });
    }
  }

  // const add = () => {
  //   const payload = {
  //     title: education
  //   };
  //   axios.post(Urls.post.addeducation, payload).then((response) => {});
  // };

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
              <Notification message="Education added successfully." />
            </b>
          ) : null}
        </div>
      </div>

      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {errorMsgRepeated ? (
            <b>
              <Notification message="This Education name is already exist!" />
            </b>
          ) : null}
        </div>
      </div>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add Education</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>
                      Education Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      onChange={(e) => {
                        setEducation(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter Education Name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>
                      Country Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Select
                      value={countryId.title}
                      onChange={handleEducationChange}
                      options={countryData?.map((item) => {
                        return {
                          label: item?.title,
                          value: item?._id
                        };
                      })}
                      onInputChange={handleSearchInput}
                      placeholder="Search..."
                      isSearchable
                    />
                  </Form.Group>

                  {/* <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>
                      Country Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select required={true} as="select"
                     onChange={handleChange} placeholder="Select Country">
                      <option value={''}>Select Country</option>
                      {countryData?.map((item, index) => {
                        return (
                          <option key={index} value={item?._id}>
                            {item?.title}
                          </option>
                        )
                      })}
                    </Form.Select>
                  </Form.Group> */}
                </Row>

                <Col xs="auto" className="my-1">
                  <Button type="submit" variant="primary" size="sm" onClick={add}>
                    <Link className="text-white">Add</Link>
                  </Button>
                  <Link to={'/masters/Education'}>
                    <Button variant="danger" size="sm">
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

export default AddEducation;
