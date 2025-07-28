/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Urls } from '../../helpers/Urls';
import Notification from '../Widgets/Statistic/Notification';
import Select from 'react-select';

import { useParams } from 'react-router-dom';
function EditEducation() {
  const location = useLocation();
  const page = location?.state?.activePage;
  const limit = location?.state?.limit;

  const navigate = useNavigate();
  // const [title, setTitle] = useState('');
  const [newTitle, setNewTitle] = useState('');
  let [statusUpdate, setStatusUpdate] = useState(false);

  const [countryId, setCountryId] = useState('');
  const [countryData, setCountryData] = useState([]);
  let [searchEducation, setSearchEducation] = useState('');
  let educationLimit = 50;

  const params = useParams();

  function allCountries(){
    axios.get(Urls.get.countries + `?limit=${educationLimit}&q=${searchEducation}`).then((res) => {
      console.log('All Countries edit:)', res);
      setCountryData(res?.data?.getAllCountries?.docs || []);
    });
  }

  const fetch = () => {
    axios.get(Urls.get.education + '/' + params.id).then((response) => {
      console.log("single data:)", response);
      setNewTitle(response.data?.getEducation.title);
      // setCountryId(response.data?.getEducation?.country)
      setCountryId({ label: response.data?.getEducation?.country?.title, value: response.data?.getEducation?.country?._id });
    });
  };
  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    allCountries();
  }, [searchEducation]);

  // const handleChange = (e) => {
  //   console.log(e.target.value);
  //   setCountryId(e.target.value);
  // };

  const handleEducationChange = (countryId) => {
    setCountryId(countryId);
  };

  const handleSearchInput = (inputS) => {
    setSearchEducation(inputS);
  };

  const update = (e) => {
    e.preventDefault();
    const payload = {
      title: newTitle,
      country : countryId.value
    };
    axios.put(Urls.put.updateEducation + params.id, payload).then((res) => {
      if (res.data.status === 'success') {
        setStatusUpdate(true);

        setTimeout(() => {
          setStatusUpdate(false);
          navigate('/masters/Education', { state: { activePage: page, limit: limit } });
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
              <Card.Title as="h5">Update Education</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={update}>
                <Row>
                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>Education Name</Form.Label>
                    <Form.Control
                      defaultValue={newTitle}
                      required
                      onChange={(e) => {
                        setNewTitle(e.target.value);
                      }}
                      type="text"
                      placeholder="Enter Country Name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" as={Col} md="6">
                    <Form.Label style={{ fontWeight: 'bold', color: 'black' }}>
                      Country Name 
                    </Form.Label>
                    <Select
                      value={countryId}
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
                    <Form.Select required={true} as="select" value={countryId}
                     onChange={handleChange} 
                     placeholder="Select Country">
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
                    Update
                  </Button>
                  <Link to={'/masters/Education'} state={{ activePage: page, limit: limit }}>
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

export default EditEducation;
