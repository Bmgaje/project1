/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Urls } from '../../helpers/Urls';
import Notification from '../Widgets/Statistic/Notification';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
function EditUniversity() {
  const navigate = useNavigate();
  const location = useLocation();
  const page = location?.state?.activePage;
  const limit = location?.state?.limit;

  const [newTitle, setNewTitle] = useState('');
  let [statusUpdate, setStatusUpdate] = useState(false);

  const [countryId, setCountryId] = useState('');
  const [countryData, setCountryData] = useState([]);
  const [searchCountry, setSearchCountry] = useState('');
  const params = useParams();
  const countrtLimit = 50;

  function allCountry() {
    axios.get(Urls.get.countries + `?limit=${countrtLimit}&q=${searchCountry}`).then((res) => {
      setCountryData(res?.data?.getAllCountries?.docs || []);
    });
  }

  const fetch = () => {
    axios.get(Urls.get.university + '/' + params.id).then((response) => {
      const data = response?.data?.data;
      setNewTitle(data?.title);
      // setCountryId(response?.data?.data?.country);
      setCountryId({ label: data?.country?.title, value: data?.country?._id });
    });
  };
  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    allCountry();
  }, [searchCountry]);

  // const handleChange = (e) => {
  //   setCountryId(e.target.value);
  // };

  const handleCountryChange = (countryId) => {
    setCountryId(countryId);
  };

  const handleSearchInput = (inputS) => {
    setSearchCountry(inputS);
  };

  const update = (e) => {
    e.preventDefault();
    const payload = {
      title: newTitle,
      country: countryId.value
    };
    axios.put(Urls.put.updateUniversity + params.id, payload).then((res) => {
      if (res.data.status === 'success') {
        setStatusUpdate(true);

        setTimeout(() => {
          setStatusUpdate(false);

          navigate('/masters/University', { state: { activePage: page, limit: limit } });
        }, 2000);
      } else {
        alert('something went wrong plese try again');
      }
    });
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
              <Card.Title as="h5">Update University</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={update}>
                <Row>
                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>University Name</Form.Label>
                    <Form.Control
                      defaultValue={newTitle}
                      required
                      onChange={(e) => {
                        setNewTitle(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter University Name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Country Name</Form.Label>
                    <Select
                      value={countryId}
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
                    <Form.Select required={true} as="select" value={countryId} onChange={handleChange} placeholder="Select Country">
                      <option value={''}>Select Country</option>
                      {countryData?.map((item, index) => {
                        return (
                          <option key={index} value={item?._id}>
                            {item?.title}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group> */}
                </Row>

                <Col xs="auto" className="my-1">
                  <Button type="submit" variant="primary" size="sm">
                    University Update
                  </Button>
                  <Link to={'/masters/University'} state={{ activePage: page, limit: limit }}>
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

export default EditUniversity;
