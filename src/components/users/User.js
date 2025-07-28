/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Button, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { Urls } from '../../helpers/Urls';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Notification from '../Widgets/Statistic/Notification';
import '../users/css/user.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FaUsers } from 'react-icons/fa';
import 'animate.css';
import ScaleLoader from 'react-spinners/ScaleLoader';

function User() {
  const navigate = useNavigate();
  const location = useLocation();
  let [userData, setUserData] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(location?.state?.page || 1);
  const [limit, setLimit] = useState(location?.state?.limit || 10);
  let [search, setSearch] = useState('');
  const [__id, setId] = useState();
  let [statusUpdate, setStatusUpdate] = useState(false);
  let [statusUpdateWaiting, setStatusUpdateWaiting] = useState(false);
  let [loading, setLoading] = useState(false);

  // const [waiting_id, setWaitingId] = useState();

  let [totaldocs, setTotaldocs] = useState('');
  const [currentChunk, setCurrentChunk] = useState(0);

  function getUsers() {
    setLoading(true);
    axios
      .get(Urls.get.getAllUsers + `?page=${page}&limit=${limit}&q=${search}&is_delete=no`)
      .then((res) => {
        setUserData(res?.data?.data);
        setPage(res?.data?.page);
        setTotalPages(res?.data?.totalPages);
        setTotaldocs(res?.data?.totalDocs);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getUsers();
  }, [page, limit, search]);

  const handleLimit = (e) => {
    setLimit(e.target.value);
    setPage(1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatus = (e) => {
    e.preventDefault();
    const payload = {
      status: e.target.value
    };
    axios.post(Urls.post.addStatus + '/' + __id + `?type=user`, payload).then(() => {
      setStatusUpdate(true);
      setTimeout(() => {
        setStatusUpdate(false);
        getUsers();
      }, 2000);
    });
  };

  const handleStatusWaitingList = (e, id) => {
    e.preventDefault();
    const payload = {
      waiting_list: e.target.value
    };
    axios.post(Urls.post.waitingListStatus + '/' + id, payload).then(() => {
      setStatusUpdateWaiting(true);
      setTimeout(() => {
        setStatusUpdateWaiting(false);
        getUsers();
      }, 2000);
    });
  };

  // Pagination button

  const pagesPerChunk = 5;
  const totalChunks = Math.ceil(totalPages / pagesPerChunk);

  const handleNext = () => {
    if (currentChunk < totalChunks - 1) {
      setCurrentChunk(currentChunk + 1);
    }
  };
  const handlePrev = () => {
    if (currentChunk > 0) {
      setCurrentChunk(currentChunk - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
    navigate(location.pathname, { replace: true, state: pageNumber });
  };

  const chunkStartPage = currentChunk * pagesPerChunk + 1;
  const chunkEndPage = Math.min(chunkStartPage + pagesPerChunk - 1, totalPages);
  const pages = [];
  for (let i = chunkStartPage; i <= chunkEndPage; i++) {
    pages.push(i);
  }

  // Showing of 1 to 10 of 100 entries.
  const indexOfLastEntry = page * limit;
  const indexOfFirstEntry = indexOfLastEntry - limit;

  const startEntry = indexOfFirstEntry + 1;
  const endEntry = Math.min(indexOfLastEntry, totaldocs);

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
          {statusUpdateWaiting ? (
            <b>
              <Notification message="Waiting list status update successfully." />
            </b>
          ) : null}
        </div>
      </div>

      <div className="row pb-3">
        <div className="col-2 offset-10">
          <div className="d-flex justify-content-evenly align-items-center">
            <div className="text-dark">Limit :</div>
            <div>
              <select className="btn btn-light p-1" style={{ border: '1px solid #10446c' }} onChange={handleLimit} value={limit}>
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

      <Row className="mainUser animate__animated animate__fadeInRight">
        <Col>
          <Card style={{ borderRadius: 15, border: '1px solid #10446c' }}>
            <Card.Header
              style={{
                borderBottom: '1px dashed #10446c'
              }}
            >
              <Row>
                <div className="col-7 pt-1">
                  <Card.Title as="h4">
                    <FaUsers
                      style={{
                        color: '#10446c',
                        marginRight: '8px',
                        fontSize: '40px',
                        padding: '5px',
                        backgroundColor: '#f1faee',
                        borderRadius: '50%',
                        border: '2px dashed #10446c'
                      }}
                    />
                    <b style={{ color: '#10446c' }}>Users Table</b>
                  </Card.Title>
                </div>

                <div className="col-4 d-flex">
                  <Form.Group className="mb-3" as={Col} controlId="exampleForm.ControlSelect1">
                    <InputGroup>
                      <Form.Control
                        className="bg-white py-2"
                        style={{ border: '1px solid #10446c' }}
                        size="sm"
                        onChange={handleSearch}
                        type="text"
                        placeholder=" Search"
                      />
                    </InputGroup>
                  </Form.Group>
                </div>
              </Row>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center">
                  <ScaleLoader color="#10446c" />
                  <h6 className="text-danger mt-3">Loading.....</h6>
                </div>
              ) : userData?.length === 0 ? (
                <div className="text-center pt-3 pb-3">
                  <h6 className="text-danger">No data available ! 😥</h6>
                </div>
              ) : (
                <Table responsive hover bordered>
                  <thead className="tableHeader">
                    <tr className="text-center">
                      <th>ID</th>
                      <th>Name</th>
                      {/* <th>Email</th> */}
                      <th>Email Verify</th>
                      <th>Gender</th>
                      <th>Status</th>
                      <th>Waiting list status</th>
                      <th>Approved By</th>
                      <th>Referred By</th>
                      <th>Referral Code</th>
                      <th>Information</th>
                    </tr>
                  </thead>

                  {userData.map((item, index) => {
                    return (
                      <tbody key={index} className="tableBody">
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item?.name}</td>
                          {/* <td>{item?.email}</td> */}
                          <td>{item?.email_verify}</td>
                          <td>{item?.gender ? item?.gender : 'NA'}</td>
                          <td className="text-center">
                            <select
                              className="btn btn-light p-1 dropdown-toggle"
                              style={{ border: '1px solid #10446c' }}
                              onChange={handleStatus}
                              onClick={() => setId(item._id)}
                              value={item?.status}
                            >
                              <option value="active">Active</option>
                              <option value="draft">In-Active</option>
                            </select>
                          </td>
                          {/* <td>
                        <b style={{ color: item.status === 'active' ? 'green' : 'red' }}>
                          {item.status === 'active' ? 'Active' : 'Inactive'}
                        </b>
                      </td> */}
                          <td className="text-center">
                            <select
                              className="btn btn-light p-1 dropdown-toggle"
                              style={{ border: '1px solid #10446c' }}
                              onChange={(e) => handleStatusWaitingList(e, item._id)}
                              value={item?.waiting_list}
                            >
                              <option value="yes" disabled>
                                Yes
                              </option>
                              <option value="no">No</option>
                            </select>
                          </td>

                          <td>{item?.approved_by ? item?.approved_by : 'NA'}</td>
                          <td>{item?.referred_by?.name ? item?.referred_by?.name : 'NA'}</td>
                          <td>{item?.referral_code ? item?.referral_code : 'NA'}</td>
                          <td className="text-center">
                            <Link to={'/user/info/' + item?._id} state={{ page, limit }}>
                              <Button style={{ backgroundColor: '#327cb3', border: 'none' }} size="sm">
                                <FontAwesomeIcon icon={faEye} />
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </Table>
              )}

              {/* <Card title="Pagination" className="d-flex align-items-center pt-3">
                <Pagination>
                  {Array(totalPages)
                    .fill('')
                    .map((item, index) => (
                      <Pagination.Item key={index} onClick={() => setPage(index + 1)}>
                        {index + 1}
                      </Pagination.Item>
                    ))}
                </Pagination>
              </Card> */}

              {/* Pagination */}

              <div className="container ">
                <div className="row d-flex justify-content-center">
                  <div className="col-6 pt-3 ">
                    <div
                      style={{
                        borderLeft: '5px solid #10446c',
                        paddingLeft: '5px'
                      }}
                    >
                      <h5 style={{ color: '#10446c', fontSize: '16px' }}>
                        Showing {startEntry} to {endEntry} of {totaldocs} entries.
                      </h5>
                    </div>
                  </div>

                  <div className="col-6 pt-3 text-center ">
                    <Button
                      onClick={handlePrev}
                      type="button"
                      className="btn btn-sm"
                      style={{ backgroundColor: '#10446c', border: 'none' }}
                      disabled={currentChunk === 0}
                    >
                      {'<'}
                    </Button>

                    {pages.map((value) => {
                      return (
                        <button
                          key={value}
                          type="button"
                          className={page === value ? 'btn btn-sm btn-primary rounded-circle' : 'btn btn-sm btn-dark'}
                          onClick={() => handlePageClick(value)}
                        >
                          {value}
                        </button>
                      );
                    })}

                    <Button
                      onClick={handleNext}
                      type="button"
                      className="btn btn-sm "
                      style={{ backgroundColor: '#10446c', border: 'none' }}
                      disabled={currentChunk === totalChunks - 1}
                    >
                      {'>'}
                    </Button>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default User;
