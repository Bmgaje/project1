/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Pagination, Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Urls } from '../../helpers/Urls';
import Notification from '../Widgets/Statistic/Notification';
import '../state/css/state.css';

function State() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const [totalPages, setTotalPages] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [deleteState, setDeleteState] = useState(null);
  const [search, setSearch] = useState('');
  const [countryData, setCountryData] = useState([]);
  const [countryId, setcountryId] = useState('');
  const [__id, setId] = useState();

  let [statusUpdate, setStatusUpdate] = useState(false);
  let [deleteNotification, setDeleteNotification] = useState(false);

  const fetchState = () => {
    axios
      .get(Urls.get.states + `?page=${activePage}&limit=${limit}&is_delete=no&q=${search}&country=${countryId}`)
      .then((res) => {
        console.log('state data watch:', res);
        setTotalPages(res.data?.getAllStates.totalPages);
        setActivePage(res.data?.getAllStates.page);
        setData(res.data?.getAllStates.docs);
      })
      .catch((err) => {});
  };

  const fetchCountry = () => {
    axios.get(Urls.get.countries).then((res) => {
      setCountryData(res.data?.getAllCountries?.docs);
    });
  };

  const deleteItem = () => {
    axios.delete(Urls.delete.deleteState + deleteState).then((res) => {
      setDeleteNotification(true);
      setTimeout(() => {
        setDeleteNotification(false);
        fetchState();
      }, 2000);
    });
  };

  useEffect(() => {
    fetchState();
    fetchCountry();
  }, [activePage, limit, search, countryId]);

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

  const handleCountryChange = (e) => {
    setcountryId(e.target.value);
    setActivePage(1);
  };

  const handleStatus = (e) => {
    e.preventDefault();
    const payload = {
      status: e.target.value
    };
    axios.post(Urls.post.addStatus + '/' + __id + `?type=state`, payload).then((res) => {
      console.log(res.data?.status);
      setStatusUpdate(true);
      setTimeout(() => {
        setStatusUpdate(false);
        fetchState();
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
              <Notification message="State delete successfully." />
            </b>
          ) : null}
        </div>
      </div>

      <Row className="mainState">
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
                <div className="col-4 pt-1">
                  <Card.Title as="h4">
                    <b>State Table</b>
                  </Card.Title>
                </div>

                <div className="col-6 pt-1">
                  <Row>
                    <Form.Group className="mb-3" as={Col} controlId="exampleForm.ControlSelect1">
                      <Form.Select as="select" onChange={handleCountryChange} size="sm" placeholder="Select Country">
                        <option value={''}>Select Country</option>
                        {countryData
                          ?.filter((item) => item.status === 'active') // Filter only active countries
                          .map((item, index) => {
                            return (
                              <option key={index} value={item._id}>
                                {item.title}
                              </option>
                            );
                          })}
                      </Form.Select>

                      {/* <Form.Select as="select" onChange={handleCountryChange} size="sm" placeholder="Select Country">
                      <option value={''}>Select Country</option>
                      {countryData?.map((item, index) => {
                        return (
                          <option key={index} value={item._id}>
                            {item.title}
                          </option>
                        );
                      })}
                    </Form.Select> */}
                    </Form.Group>

                    <Form.Group className="mb-3" as={Col} controlId="exampleForm.ControlSelect1">
                      <InputGroup>
                        <Form.Control className="bg-white py-2 " size="sm" onChange={handleSearch} type="text" placeholder=" Search " />
                      </InputGroup>
                    </Form.Group>
                  </Row>
                </div>
                <div className="col-2 d-flex">
                  <div>
                    <Link to={'/masters/AddState'}>
                      <Button variant="success" as="btn" size="sm">
                        <FontAwesomeIcon icon={faAdd} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Row>
            </Card.Header>
            <Card.Body>
              <Table responsive hover bordered>
                <thead className="tableHeader">
                  <tr className="text-center">
                    <th>ID</th>
                    <th>Country Name</th>
                    <th>State</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {data.map((item, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <th scope="row" className="text-center">
                          {index + 1}
                        </th>
                        <td> {item.country.title}</td>
                        <td>{item.title}</td>
                        <td className="text-center">
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
                        <td className="text-center">
                          <Button
                            variant="danger"
                            as="btn"
                            size="sm"
                            onClick={() => {
                              setShow(true);
                              setDeleteState(item._id);
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>

                          <Link to={'/masters/EditState/' + item._id} className="text-white">
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
          <Modal.Body>Are you sure want to delete the state ?</Modal.Body>
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

export default State;
