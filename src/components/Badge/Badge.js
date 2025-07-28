/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Form, InputGroup, Button, Modal } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Urls, imgUrl } from '../../helpers/Urls';
import Notification from '../Widgets/Statistic/Notification';
import '../Badge/css/badge.css';
import 'animate.css';
import { SlBadge } from 'react-icons/sl';
import ScaleLoader from 'react-spinners/ScaleLoader';

export default function Badge() {
  const navigate = useNavigate();
  const location = useLocation();

  let [badgeData, setBadgeData] = useState([]);
  let [loading, setLoading] = useState(false);

  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(location?.state?.page || 1);
  const [limit, setLimit] = useState(location?.state?.limit || 10);
  const [search, setSearch] = useState('');

  const [deleteRecord, setDeleteRecord] = useState(null);
  const [show, setShow] = useState(false);
  let [deleteNotification, setDeleteNotification] = useState(false);

  const [__id, setID] = useState();
  const [statusNoti, setStatusNoti] = useState(false);

  let [totaldocs, setTotaldocs] = useState('');
  let [currentChunk, setCurrentChunk] = useState(0);

  function getBadge() {
    setLoading(true);
    axios
      .get(Urls.get.getBadges + `?page=${page}&limit=${limit}&q=${search}&is_delete=no`)
      .then((res) => {
        setBadgeData(res?.data?.data?.docs);
        setTotalPages(res?.data?.data?.totalPages);
        setTotaldocs(res?.data?.data?.totalDocs);
        setPage(res?.data?.data?.page);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getBadge();
  }, [page, limit, search]);

  const handleLimit = (e) => {
    setLimit(e.target.value);
    setPage(1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  function handleStatus(e) {
    e.preventDefault();
    const payload = {
      status: e.target.value
    };
    axios.put(Urls.put.badgeStatus + __id, payload).then(() => {
      setStatusNoti(true);
      setTimeout(() => {
        setStatusNoti(false);
        getBadge();
      }, 2000);
      //  alert("Status change successfully.")
    });
  }

  const deleteItem = () => {
    axios.delete(Urls.delete.deleteBadge + deleteRecord).then(() => {
      setDeleteNotification(true);
      setTimeout(() => {
        setDeleteNotification(false);
        getBadge();
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

  // ******* Start of import file code  ******
  let [emptyMsg, setEmptyMsg] = useState(false);
  let [fileImportMsg, setFileImportMsg] = useState(false);
  let [repeatDataMsg, setRepeatDataMsg] = useState(false);
  let [selectedFile, setSelectedFile] = useState(null);
  let [loadingUpload, setLoadingUpload] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!selectedFile) {
      setEmptyMsg(true);
      setTimeout(() => {
        setEmptyMsg(false);
      }, 2000);
      return;
    }

    const formData = new FormData();
    formData.append('Badge', selectedFile); // 'Country' is the key expected by the API

    try {
      setLoadingUpload(true);

      const response = await axios.post(Urls.post.badgeImport, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data) {
        setFileImportMsg(true);
        setTimeout(() => {
          setFileImportMsg(false);
        }, 2000);
      }
    } catch (error) {
      setRepeatDataMsg(true);
      setTimeout(() => {
        setRepeatDataMsg(false);
      }, 3000);
    } finally {
      setLoadingUpload(false);
    }
  };
  // ***** End of import file code ******

  return (
    <div>
      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {deleteNotification ? (
            <b>
              <Notification message="Badge delete successfully." />
            </b>
          ) : null}
        </div>
      </div>

      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {emptyMsg ? (
            <b>
              <Notification message="Please select a CSV file to import! 😥" />
            </b>
          ) : null}
        </div>
      </div>

      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {fileImportMsg ? (
            <b>
              <Notification message="File imported successfully! 😍" />
            </b>
          ) : null}
        </div>
      </div>

      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {statusNoti ? (
            <b>
              <Notification message="Status change successfully 😍" />
            </b>
          ) : null}
        </div>
      </div>

      <div className="row position-relative">
        <div className="col-4 offset-8 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {repeatDataMsg ? (
            <b>
              <Notification message="Please check your CSV file repeated data is not allow !" />
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

      <Row className="mainBadge animate__animated animate__fadeInRight">
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
                    <SlBadge
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
                    <b style={{ color: '#10446c' }}>Badge Table</b>
                  </Card.Title>
                </div>

                <div className="col-3 d-flex">
                  <Form.Group className="mb-3" as={Col} controlId="exampleForm.ControlSelect1">
                    <InputGroup>
                      <Form.Control
                        className="bg-white py-2 "
                        size="sm"
                        style={{ border: '1px solid #10446c' }}
                        type="text"
                        onChange={handleSearch}
                        placeholder=" Search"
                      />
                    </InputGroup>
                  </Form.Group>
                </div>

                <div className="col-2 d-flex">
                  <div>
                    <Link to={'/addbadge'}>
                      <Button style={{ backgroundColor: ' #10446c', border: 'none' }} size="sm">
                        Add <FontAwesomeIcon icon={faAdd} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Row>
              <Row>
                <div className="col-4 pt-2">
                  <Form.Label style={{ fontWeight: 'bold', color: ' #10446c' }}>Select CSV File</Form.Label>
                  <input type="file" accept=".csv" style={{ border: '1px solid  #10446c', borderRadius: 4 }} onChange={handleFileChange} />
                </div>

                <div className="col-2 pt-2">
                  <button className="btn  btn-sm btn-danger mt-4" onClick={handleFileUpload} disabled={loadingUpload}>
                    {loadingUpload ? 'Importing...' : 'Import'}
                  </button>
                </div>
              </Row>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center">
                  <ScaleLoader color="#10446c" />
                  <h6 className="text-danger mt-3">Loading.....</h6>
                </div>
              ) : badgeData?.length === 0 ? (
                <div className="text-center pt-3 pb-3">
                  <h6 className="text-danger">No data available ! 😥</h6>
                </div>
              ) : (
                <Table responsive hover bordered>
                  <thead className="tableHeader">
                    <tr className="text-center">
                      <th>Sr No.</th>
                      <th>Icon</th>
                      <th>Badge Type</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {badgeData.map((item, index) => {
                    return (
                      <tbody key={index} className="tableBody">
                        <tr>
                          <td className="text-center">{index + 1}</td>
                          <td>
                            <img src={imgUrl + item?.icon} style={{ width: '30px', height: '30px' }} alt="" />
                          </td>
                          <td>{item?.badgeType ? item?.badgeType : 'NA'}</td>
                          <td>{item?.title ? item?.title : 'NA'}</td>
                          <td>{item?.description ? item?.description : 'NA'}</td>
                          <td className="text-center">
                            <select
                              className="btn btn-light p-1 dropdown-toggle"
                              style={{ border: '1px solid #10446c' }}
                              onChange={handleStatus}
                              onClick={() => setID(item._id)}
                              value={item?.status}
                            >
                              <option value="active">Active</option>
                              <option value="draft">In-Active</option>
                            </select>
                          </td>

                          <td className="text-center">
                            <Link to={location?.state?.page || 1}>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => {
                                  setShow(true);
                                  setDeleteRecord(item._id);
                                }}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </Link>
                            <Link to={'/editbadge/' + item._id} state={{ page, limit }} className="text-white">
                              <Button variant="success" size="sm">
                                <FontAwesomeIcon icon={faEdit} />
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </Table>
              )}

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
            </Card.Body>
          </Card>
        </Col>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text-danger">Alert</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure want to delete the badge ?</Modal.Body>
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
