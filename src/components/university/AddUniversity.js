/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Urls } from '../../helpers/Urls';
import Notification from '../Widgets/Statistic/Notification';
import Select from 'react-select';
function AddUniversity() {
  const [University, setUniversity] = useState('');
  let [error, setError] = useState(false);
  let [addStatus, setAddStatus] = useState(false);
  const navigate = useNavigate();

  const [countryId, setCountryId] = useState('');
  const [countryData, setCountryData] = useState([]);
  let [searchCountry, setSearchCountry] = useState('');
  const countryLimit = 50;

  let [errorMsgRepeated, setErrorMsgRepeated] = useState(false);

  function allCountry() {
    axios.get(Urls.get.countries + `?limit=${countryLimit}&q=${searchCountry}`).then((res) => {
      console.log('All Countries:)', res);
      setCountryData(res?.data?.getAllCountries?.docs || []);
    });
  }

  useEffect(() => {
    allCountry();
  }, [searchCountry]);

  // const handleChange = (e) => {
  //   console.log('country id', e.target.value);
  //   setCountryId(e.target.value);
  // };

  const handleCountryChange = (countryId) => {
    setCountryId(countryId.value);
  };

  const handleSearchInput = (inputS) => {
    setSearchCountry(inputS);
  };

  function add(e) {
    e.preventDefault();
    if (!University || !countryId) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else {
      const payload = {
        title: University,
        country: countryId
      };
      axios
        .post(Urls.post.adduniversity, payload)
        .then((data) => {
          setAddStatus(true);
          setTimeout(() => {
            setAddStatus(false);
            navigate('/masters/University');
          }, 2000);
          console.log(data);
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
  //     title: University
  //   };
  //   axios.post(Urls.post.adduniversity, payload).then((response) => {});
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
              <Notification message="University added successfully." />
            </b>
          ) : null}
        </div>
      </div>

      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {errorMsgRepeated ? (
            <b>
              <Notification message="This Title is already exist!" />
            </b>
          ) : null}
        </div>
      </div>

      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Add University</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>
                      University Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      required
                      onChange={(e) => {
                        setUniversity(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter University Name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>
                      Country Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Select
                      value={countryId.title}
                      onChange={handleCountryChange}
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
                    <Form.Select required={true} as="select" onChange={handleChange} placeholder="Select Country">
                      <option value={''}>Select Country</option>
                      {countryData?.map((item, index) => {
                        return (
                          <option key={index} value={item?._id}>
                            {item?.title}
                          </option>
                        );
                      })}
                    </Form.Select> */}
                </Row>

                <Col xs="auto" className="my-1">
                  <Button type="submit" variant="primary" size="sm" onClick={add}>
                    <Link className="text-white">Add University</Link>
                  </Button>
                  <Link to={'/masters/University'}>
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

export default AddUniversity;
