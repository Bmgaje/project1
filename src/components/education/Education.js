/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Urls } from '../../helpers/Urls';
import Notification from '../Widgets/Statistic/Notification';
import { MdCastForEducation } from 'react-icons/md';
import '../education/css/education.css';
import 'animate.css';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Select from 'react-select';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: '1px solid #10446c',
    boxShadow: state.isFocused ? '0 0 0 0px #10446c' : null,
    '&:hover': {
      border: '1px solid #69dbe6;'
    }
  })
};

function Education() {
  const navigate = useNavigate();
  const location = useLocation();

  const [Data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const [totalPages, setTotalPages] = useState(null);
  const [activePage, setActivePage] = useState(location?.state?.activePage || 1);
  const [limit, setLimit] = useState(location?.state?.limit || 10);

  const [deleteEducation, setDeleteEducation] = useState(null);
  const [search, setSearch] = useState('');
  const [__id, setId] = useState();

  let [statusUpdate, setStatusUpdate] = useState(false);
  let [deleteNotification, setDeleteNotification] = useState(false);
  let [loading, setLoading] = useState(false);

  let [totaldocs, setTotaldocs] = useState('');
  let [currentChunk, setCurrentChunk] = useState(0);

  const [countryId, setCountryId] = useState('');
  const [countryData, setCountryData] = useState([]);

  const [selectedEducation, setSelectedEducation] = useState({
    label: 'Select Country',
    value: ''
  });

  let [searchEducation, setSearchEducation] = useState('');
  let educationLimit = 50;

  const fetchData = () => {
    setLoading(true);
    axios
      .get(Urls.get.education + `?page=${activePage}&limit=${limit}&q=${search}&is_delete=no&country=${countryId}`)
      .then((res) => {
        setTotalPages(res?.data?.getAllEducation.totalPages);
        setActivePage(res?.data?.getAllEducation.page);
        setData(res?.data?.getAllEducation.docs);
        setTotaldocs(res?.data?.getAllEducation.totalDocs);
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  };

  function allCountry() {
    axios.get(Urls.get.countries + `?limit=${educationLimit}&q=${searchEducation}`).then((res) => {
      setCountryData(res?.data?.getAllCountries?.docs || []);
    });
  }

  useEffect(() => {
    allCountry();
  }, [searchEducation]);

  const deleteItem = () => {
    axios.delete(Urls.delete.deleteEducation + deleteEducation).then(() => {
      setDeleteNotification(true);
      setTimeout(() => {
        setDeleteNotification(false);
        fetchData();
      }, 2000);
    });
  };

  useEffect(() => {
    fetchData();
  }, [activePage, limit, search, countryId]);

  useEffect(() => {
    fetchData();
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

  const handleEducationChange = (selectedOption) => {
    setSelectedEducation(selectedOption);
    setCountryId(selectedOption ? selectedOption.value : ''); // Update tradeCategory ID
  };

  const handleSearchInput = (inputS) => {
    setSearchEducation(inputS);
    setActivePage(1);
  };

  const handleStatus = (e) => {
    e.preventDefault();
    const payload = {
      status: e.target.value
    };
    axios.post(Urls.post.addStatus + '/' + __id + `?type=education`, payload).then((res) => {
      setStatusUpdate(true);
      setTimeout(() => {
        setStatusUpdate(false);
        fetchData();
      }, 2000);
    });
  };

  // Start of Pagination button

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
  // End of Pagination button

  // ******* Start of import file code  ******
  let [emptyMsg, setEmptyMsg] = useState(false);
  let [fileImportMsg, setFileImportMsg] = useState(false);

  let [selectedFile, setSelectedFile] = useState(null);
  let [loadingUpload, setLoadingUpload] = useState(false);
  let [repeatDataMsg, setRepeatDataMsg] = useState(false);

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
    formData.append('Education', selectedFile);

    try {
      setLoadingUpload(true);

      const response = await axios.post(Urls.post.educationImport, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setFileImportMsg(true);
      setTimeout(() => {
        setFileImportMsg(false);
      }, 2000);
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
              <Notification message="Education delete successfully." />
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

      <Row className="mainEducation animate__animated animate__fadeInRight">
        <Col>
          <Card style={{ borderRadius: 15, border: '1px solid #10446c' }}>
            <Card.Header
              style={{
                position: 'relative',
                borderBottom: '1px dashed #10446c'
              }}
            >
              <Row>
                <div className="col-3 pt-1">
                  <Card.Title as="h4">
                    <MdCastForEducation
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
                    <b style={{ color: '#10446c' }}>Education Table</b>
                  </Card.Title>
                </div>

                <div className="col-4">
                  <Form.Group className="mb-3" as={Col} controlId="exampleForm.ControlSelect1">
                    <Select
                      value={selectedEducation}
                      onChange={handleEducationChange}
                      options={[
                        { label: 'All Country', value: '' }, // Represents selecting all
                        ...countryData.map((item) => ({
                          label: item.title,
                          value: item._id
                        }))
                      ]}
                      placeholder="Select Country"
                      onInputChange={handleSearchInput}
                      isSearchable
                      styles={customStyles}
                    />
                  </Form.Group>
                </div>

                <div className="col-3 d-flex">
                  <Form.Group className="mb-3" as={Col} controlId="exampleForm.ControlSelect1">
                    <InputGroup>
                      <Form.Control
                        className="bg-white py-2 "
                        size="sm"
                        style={{ border: '1px solid #10446c' }}
                        onChange={handleSearch}
                        type="text"
                        placeholder=" Search"
                      />
                    </InputGroup>
                  </Form.Group>
                </div>

                <div className="col-2 d-flex">
                  <div>
                    <Link to={'/masters/AddEducation'}>
                      <Button style={{ backgroundColor: ' #10446c', border: 'none' }} size="sm">
                        Add <FontAwesomeIcon icon={faAdd} />
                      </Button>
                    </Link>
                  </div>
                  {/* <div className="d-flex justify-content-evenly align-items-center">
                    <div className="">Limit :</div>
                    <div>
                      <select className="btn btn-light p-1" onChange={handleLimit} value={limit}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                      </select>
                    </div>
                  </div> */}
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
              ) : Data?.length === 0 ? (
                <div className="text-center pt-3 pb-3">
                  <h6 className="text-danger">No data available ! 😥</h6>
                </div>
              ) : (
                <Table responsive hover bordered>
                  <thead className="tableHeader">
                    <tr className="text-center">
                      <th>ID</th>
                      <th>Education</th>
                      <th>Country</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {Data.map((item, index) => {
                    return (
                      <tbody key={index} className="tableBody">
                        <tr>
                          <td className="text-center">{index + 1}</td>
                          <td>{item?.title ? item?.title : 'NA'}</td>
                          <td>{item?.country?.title ? item?.country?.title : 'NA'}</td>
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
                          <td className="text-center">
                            <Link to={location?.state?.activePage || 1}>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => {
                                  setShow(true);
                                  setDeleteEducation(item._id);
                                }}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </Link>

                            <Link to={'/masters/EditEducation' + '/' + item._id} state={{ activePage, limit }} className="text-white">
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
          <Modal.Body>Are you sure want to delete the education ?</Modal.Body>
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

export default Education;
