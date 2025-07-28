/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Pagination, Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Urls } from '../../helpers/Urls';
import Notification from '../Widgets/Statistic/Notification';

// import { faSearch } from '@fortawesome/free-solid-svg-icons';
function City() {
  const [cityData, setCityData] = useState([]);
  const [show, setShow] = useState(false);

  const [totalPages, setTotalPages] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [deleteCity, setDeleteCity] = useState(null);

  const [countryId, setcountryId] = useState('');
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [stateId, setStateId] = useState('');

  const [search, setSearch] = useState('');

  const [__id, setId] = useState();

  let [statusUpdate, setStatusUpdate] = useState(false);
  let [deleteNotification, setDeleteNotification] = useState(false);

  const fetchStateWiseCity = () => {
    axios
      .get(Urls.get.cities + `?page=${activePage}&limit=${limit}&is_delete=no&q=${search}&state=${stateId}&country=${countryId}`)
      .then((res) => {
        setTotalPages(res.data?.getAllCities.totalPages);
        setActivePage(res.data?.getAllCities.page);
        setCityData(res.data?.getAllCities.docs);
      })
      .catch((err) => console.log(err));
  };

  const fetchCountry = () => {
    axios.get(Urls.get.countries).then((res) => {
      setCountryData(res.data?.getAllCountries?.docs);
    });
  };

  const handleChange = (e) => {
    setcountryId(e.target.value);
    setActivePage(1);
  };

  useEffect(() => {
    axios.get(Urls.get.states + `?is_delete=no&country=` + countryId).then((res) => {
      setStateData(res.data?.getAllStates?.docs);
    });
  }, [countryId]);

  useEffect(() => {
    fetchStateWiseCity();
  }, [activePage, limit, search, stateId, countryId]);

  const handleStateChange = (e) => {
    setStateId(e.target.value);
    setActivePage(1);
  };

  const deleteItem = () => {
    axios.delete(Urls.delete.deleteCity + deleteCity).then((res) => {
      setDeleteNotification(true);
      setTimeout(() => {
        setDeleteNotification(false);
        fetchStateWiseCity();
      }, 2000);
    });
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  const handleLimit = (e) => {
    setLimit(e.target.value);
    setActivePage(1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setActivePage(1);
  };

  const handleClose = () => {
    setShow(false);
  };
  const deleteBTN = () => {
    handleClose();
    deleteItem();
  };

  const handleStatus = (e) => {
    e.preventDefault();
    const payload = {
      status: e.target.value
    };
    axios.post(Urls.post.addStatus + '/' + __id + `?type=city`, payload).then((res) => {
      setStatusUpdate(true);
      setTimeout(() => {
        setStatusUpdate(false);
        fetchStateWiseCity();
      }, 2000);
    });
  };
  return (
    <div>
      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {statusUpdate ? (
            <b>
              <Notification message="Status update successfully." />
            </b>
          ) : null}
        </div>
      </div>
      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {deleteNotification ? (
            <b>
              <Notification message="City delete successfully." />
            </b>
          ) : null}
        </div>
      </div>

      <Row>
        <Col>
          <div className="row pb-3">
            <div className="col-2 offset-10">
              <div className="d-flex justify-content-evenly align-items-center">
                <div className="">Limit :</div>
                <div>
                  <select className="btn btn-light p-1" onChange={handleLimit} value={limit}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="500">500</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <Card>
            <Card.Header>
              <Row>
                <div className="col-3 pt-1">
                  <Card.Title as="h4">
                    <b>City Table</b>
                  </Card.Title>
                </div>
                <div className="col-6 pt-1">
                  <Row>
                    <Form.Group className="mb-3" as={Col} md="4" controlId="exampleForm.ControlSelect1">
                      <Form.Select
                        required={true}
                        as="select"
                        size="sm"
                        value={countryId}
                        onChange={handleChange}
                        placeholder="Select Country"
                      >
                        <option value={''}>Select Country</option>
                        {countryData
                          ?.filter((item) => item.status === 'active')
                          .map((item, index) => {
                            return (
                              <option key={index} value={item._id}>
                                {item.title}
                              </option>
                            );
                          })}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" as={Col} md="4" controlId="exampleForm.ControlSelect1">
                      <Form.Select
                        required={true}
                        as="select"
                        size="sm"
                        value={stateId}
                        onChange={handleStateChange}
                        placeholder="Select Country"
                      >
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

                    <Form.Group className="mb-3" as={Col} md="4" controlId="exampleForm.ControlSelect1">
                      <InputGroup>
                        <Form.Control className="bg-white py-2 " size="sm" onChange={handleSearch} type="text" placeholder=" Search city" />
                      </InputGroup>
                    </Form.Group>
                  </Row>
                </div>

                <div className="col-3">
                  <div className="d-flex">
                    <Link to={'/masters/AddCity'}>
                      <Button className="px-3" variant="success" as="btn" size="sm">
                        <FontAwesomeIcon icon={faAdd} />
                      </Button>
                    </Link>

                    {/* <div className="p-2 mb-3">
                      <label className="pe-3">limit :</label>
                      <select className="btn btn-light p-1" onChange={handleLimit} value={limit}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                    </div> */}
                  </div>
                </div>
              </Row>
            </Card.Header>
            <Card.Body>
              <Table responsive hover bordered>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Country</th>
                    <th>State</th>
                    <th>City</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {cityData.map((item, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{item.country.title}</td>
                        <td>{item.state.title}</td>
                        <td>{item.title}</td>
                        <td>
                          <select
                            className="btn btn-light p-1 dropdown-toggle"
                            onChange={handleStatus}
                            onClick={() => setId(item._id)}
                            value={item?.status}
                          >
                            <option value="active">Active</option>
                            <option value="draft">In-Active</option>
                          </select>
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            as="btn"
                            size="sm"
                            onClick={() => {
                              setShow(true);
                              setDeleteCity(item._id);
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>

                          <Link to={'/masters/EditCity/' + item._id} className="text-white">
                            <Button variant="success" as="btn" size="sm">
                              <FontAwesomeIcon icon={faEdit} />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </Table>
              <Card title="Pagination" className="d-flex justify-content-center align-items-center">
                <Pagination>
                  {Array(totalPages)
                    .fill('')
                    .map((item, index) => (
                      <Pagination.Item key={index} onClick={() => setActivePage(index + 1)}>
                        {index + 1}
                      </Pagination.Item>
                    ))}
                </Pagination>
              </Card>
            </Card.Body>
          </Card>
        </Col>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text-danger">Alert</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure want to delete the city ?</Modal.Body>
          <Modal.Footer>
            <Button variant="dark" size="sm" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={deleteBTN}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </div>
  );
}

export default City;
