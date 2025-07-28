import React, { useEffect, useState } from 'react';
import '../subAdmin/css/subadmin.css';
import { Row, Col, Card, Table, Button, InputGroup, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineSettingsSuggest } from 'react-icons/md';
import 'animate.css';
import { Urls } from '../../helpers/Urls';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Notification from '../Widgets/Statistic/Notification';
import instance from '../../helpers/axiosInstance';

function SubAdmin() {
  const navigate = useNavigate();
  const location = useLocation();
  let [show, setShow] = useState(false);
  let [subAdminData, setSubAdminData] = useState([]);
  let [loading, setLoading] = useState(false);
  let [search, setSearch] = useState('');

  const [totalPages, setTotalPages] = useState(null);
  const [activePage, setActivePage] = useState(location?.state?.activePage || 1);
  const [limit, setLimit] = useState(location?.state?.limit || 10);

  let [totaldocs, setTotaldocs] = useState('');
  let [currentChunk, setCurrentChunk] = useState(0);

  let [deleteSubAdminItem, setDeleteSubAdminItem] = useState(null);
  let [deleteNotification, setDeleteNotification] = useState(false);

  const [__id, setID] = useState();
  let [statusUpdate, setStatusUpadate] = useState(false);

  function getSubAdmin() {
    setLoading(true);
    instance
      .get(Urls.get.getAllSubAdmin + `?page=${activePage}&limit=${limit}&q=${search}&is_delete=no`)
      .then((res) => {
        setSubAdminData(res?.data?.permission?.docs);
        setActivePage(res?.data?.permission?.page);
        setTotalPages(res?.data?.permission?.totalPages);
        setTotaldocs(res?.data?.permission?.totalDocs);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getSubAdmin();
  }, [activePage, limit, search]);

  const handleLimit = (e) => {
    setLimit(e.target.value);
    setActivePage(1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setActivePage(1);
  };

  const deleteItem = () => {
    instance.delete(Urls.delete.deleteSubAdmin + deleteSubAdminItem).then(() => {
      setDeleteNotification(true);
      setTimeout(() => {
        setDeleteNotification(false);
        getSubAdmin();
      }, 2000);
    });
  };

  const handleClose = () => {
    setShow(false);
  };

  const deleteBTN = () => {
    handleClose();
    deleteItem();
  };

  function handleStatus(e) {
    e.preventDefault();
    const payload = {
      status: e.target.value
    };
    instance.put(Urls.put.statusUpdateSubadmin + __id, payload).then(() => {
      setStatusUpadate(true);
      setTimeout(() => {
        setStatusUpadate(false);
        getSubAdmin();
      }, 2000);
      //  alert("Status change successfully.")
    });
  }

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
    setActivePage(pageNumber);
    navigate(location.pathname, { replace: true, state: pageNumber });
  };

  const chunkStartPage = currentChunk * pagesPerChunk + 1;
  const chunkEndPage = Math.min(chunkStartPage + pagesPerChunk - 1, totalPages);
  const pages = [];
  for (let i = chunkStartPage; i <= chunkEndPage; i++) {
    pages.push(i);
  }

  // Showing of 1 to 10 of 100 entries.
  const indexOfLastEntry = activePage * limit;
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
          {deleteNotification ? (
            <b>
              <Notification message="Sub-Admin delete successfully." />
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
      <Row className="mainSubadmin animate__animated animate__fadeInRight">
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
                    <MdOutlineSettingsSuggest
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
                    <b style={{ color: '#10446c' }}>Sub Admin Table </b>
                  </Card.Title>
                </div>

                <div className="col-3 d-flex">
                  <Form.Group className="mb-3" as={Col} controlId="exampleForm.ControlSelect1">
                    <InputGroup>
                      <Form.Control
                        className="bg-white py-2 "
                        style={{ border: '1px solid #10446c' }}
                        size="sm"
                        onChange={handleSearch}
                        type="text"
                        placeholder=" Search..."
                      />
                    </InputGroup>
                  </Form.Group>
                </div>

                <div className="col-2 d-flex">
                  <div>
                    <Link to={'/masters/addSubAdmin'}>
                      <Button style={{ backgroundColor: ' #10446c', border: 'none' }} size="sm">
                        Add <FontAwesomeIcon icon={faAdd} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Row>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center">
                  <ScaleLoader color="#10446c" />
                  <h6 className="text-danger mt-3">Loading.....</h6>
                </div>
              ) : subAdminData?.length === 0 ? (
                <div className="text-center pt-3 pb-3">
                  <h6 className="text-danger">No data available ! 😥</h6>
                </div>
              ) : (
                <Table responsive hover bordered>
                  <thead className="tableHeader">
                    <tr className="text-center">
                      <th>ID</th>
                      <th>Name</th>
                      {/* <th>Mobile</th> */}
                      <th>E-Mail</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {subAdminData.map((item, index) => {
                    return (
                      <tbody key={index} className="tableBody">
                        <tr>
                          <td className="text-center">{index + 1}</td>
                          <td>{item?.user?.name}</td>
                          {/* <td>{item?.mobile}</td> */}
                          <td>{item?.user?.email}</td>
                          <td className="text-center">
                            <select
                              className="btn btn-light p-1 dropdown-toggle"
                              style={{ border: '1px solid #10446c' }}
                              onChange={handleStatus}
                              onClick={() => setID(item?.user?._id)}
                              value={item?.user?.status}
                            >
                              <option value="active">Active</option>
                              <option value="draft">In-Active</option>
                            </select>
                          </td>
                          <td className="text-center">
                            <Link to={'/masters/editSubAdmin/' + item?.user?._id} state={{ activePage, limit }} className="text-white">
                              <Button variant="success" size="sm">
                                <FontAwesomeIcon icon={faEdit} />
                              </Button>
                            </Link>
                            <Link to={location?.state?.activePage || 1}>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => {
                                  setShow(true);
                                  setDeleteSubAdminItem(item?.user?._id);
                                }}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </Table>
              )}

              {/* <Card title="Pagination" className="d-flex justify-content-center align-items-center pt-3">
                <Pagination>
                  {Array(totalPages)
                    .fill('')
                    .map((item, index) => (
                      <Pagination.Item key={index} onClick={() => setActivePage(index + 1)}>
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
                          className={activePage === value ? 'btn btn-sm btn-primary rounded-circle' : 'btn btn-sm btn-dark'}
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

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text-danger">Alert</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure want to delete the Sub-Admin ?</Modal.Body>
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

export default SubAdmin;
