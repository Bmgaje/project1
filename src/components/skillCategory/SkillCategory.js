import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Urls } from '../../helpers/Urls';
import '../skillCategory/css/skillcategory.css';
import { Row, Col, Card, Table, Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUniversity } from 'react-icons/fa';
import 'animate.css';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Notification from '../Widgets/Statistic/Notification';
import { FaDownload } from 'react-icons/fa';

function SkillCategory() {
  const navigate = useNavigate();
  const location = useLocation();

  let [skillCateData, setSkillCateData] = useState([]);
  let [loading, setLoading] = useState(false);

  let [search, setSearch] = useState('');
  let [totalPages, setTotalPages] = useState(null);
  let [activePage, setActivePage] = useState(1);
  let [limit, setLimit] = useState(10);

  let [totaldocs, setTotaldocs] = useState('');
  let [currentChunk, setCurrentChunk] = useState(0);

  const [deleteSkillCategory, setDeleteSkillCategory] = useState(null);
  let [deleteNotification, setDeleteNotification] = useState(false);
  const [show, setShow] = useState(false);

  const [__id, setID] = useState();
  const [statusNoti, setStatusNoti] = useState(false);

  function allskillCategory() {
    setLoading(true);
    axios
      .get(Urls.get.skillCategory + `?page=${activePage}&limit=${limit}&q=${search}`)
      .then((res) => {
        setSkillCateData(res?.data?.allSkillCategory?.docs);
        setActivePage(res?.data?.allSkillCategory?.page);
        setTotalPages(res?.data?.allSkillCategory?.totalPages);
        setTotaldocs(res?.data?.allSkillCategory?.totalDocs);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    allskillCategory();
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
    axios.delete(Urls.delete.deleteSkillCate + deleteSkillCategory).then(() => {
      setDeleteNotification(true);
      setTimeout(() => {
        setDeleteNotification(false);
        allskillCategory();
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
    axios.put(Urls.put.skillCategoryStatus + __id, payload).then(() => {
      setStatusNoti(true);
      setTimeout(() => {
        setStatusNoti(false);
        allskillCategory();
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
    formData.append('SkillCategory', selectedFile); // 'Country' is the key expected by the API

    try {
      setLoadingUpload(true);

      const response = await axios.post(Urls.post.skillCategoryImport, formData, {
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

  // ***** Start of Export file code ******

  let [downloadFile, setDownloadFile] = useState('');
  let [downlaodMsg, setDownlaodMsg] = useState(false);

  function DownloadToExport() {
    axios
      .get(Urls.get.skillCategoryExport)
      .then((res) => {
        const downloadLink = res?.data?.fileUrl; // URL to the file from response
        setDownloadFile(downloadLink);

        setDownlaodMsg(true);
        setTimeout(() => {
          setDownlaodMsg(false);
        }, 2000);
      })
      .catch((error) => {
        console.error('something went to wrong!', error);
      });
  }

  useEffect(() => {
    if (downloadFile) {
      const link = document.createElement('a');
      link.href = downloadFile;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [downloadFile]);

  // ***** End of Export file code ******

  return (
    <div>
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

      <div className="row position-relative">
        <div className="col-3 offset-9 position-fixed z-3" style={{ top: '60px', right: '20px' }}>
          {deleteNotification ? (
            <b>
              <Notification message="Skill Category delete successfully." />
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
          {downlaodMsg ? (
            <b>
              <Notification message="Downlaod file successfully 😍" />
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

      <Row className="mainSkillCate animate__animated animate__fadeInRight">
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
                    <FaUniversity
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
                    <b style={{ color: '#10446c' }}>Skill Category Table</b>
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
                        placeholder=" Search"
                      />
                    </InputGroup>
                  </Form.Group>
                </div>

                <div className="col-2 d-flex">
                  <div>
                    <Link to={'/masters/AddSkillsCategory'}>
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

                <div className="col-3">
                  <button
                    type="button"
                    className="btn btn-sm btn-success"
                    onClick={DownloadToExport}
                    style={{
                      marginTop: '32px'
                    }}
                  >
                    Export to CSV <FaDownload />
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
              ) : skillCateData?.length === 0 ? (
                <div className="text-center pt-3 pb-3">
                  <h6 className="text-danger">No data available ! 😥</h6>
                </div>
              ) : (
                <Table responsive hover bordered>
                  <thead className="tableHeader">
                    <tr className="text-center">
                      <th>ID</th>
                      <th>Skill Category</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {skillCateData.map((item, index) => {
                    return (
                      <tbody key={index} className="tableBody">
                        <tr>
                          <td className="text-center">{index + 1}</td>
                          <td>{item?.title}</td>
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
                            <Link
                            //  to={location?.state?.activePage || 1}
                            >
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => {
                                  setShow(true);
                                  setDeleteSkillCategory(item._id);
                                }}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </Link>

                            <Link
                              to={'/masters/EditSkillsCategory' + '/' + item._id}
                              //  state={{ activePage, limit }}
                              className="text-white"
                            >
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
          <Modal.Body>Are you sure want to delete the skill category ?</Modal.Body>
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

export default SkillCategory;
