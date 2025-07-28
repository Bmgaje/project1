import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Carousel, Form, InputGroup, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faDownload, faPrint } from '@fortawesome/free-solid-svg-icons';
// import { faEye } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import { Urls, imgUrl } from '../../helpers/Urls';
import Notification from '../Widgets/Statistic/Notification';
import InsuranceImg from '../../../src/assets/images/insurance.png';
import Verify_identityImg from '../../../src/assets/images/verify_identity.png';
import JourneypersonImg from '../../../src/assets/images/journeyperson.png';
// import { Link } from 'react-router-dom';
import '../userBadgeRequest/css/userbadge.css';
import { FaClipboardList } from 'react-icons/fa';
import 'animate.css';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BadgeRequest() {
  const navigate = useNavigate();
  const location = useLocation();

  let [badgeRequestData, setBadgeRequestData] = useState([]);
  const [__id, setId] = useState();
  let [statusUpdate, setStatusUpdate] = useState(false);
  let [messageShow, setMessageShow] = useState();

  const [totalPages, setTotalPages] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  let [loading, setLoading] = useState(false);

  let [totaldocs, setTotaldocs] = useState('');
  let [currentChunk, setCurrentChunk] = useState(0);

  function allBadgeRequests() {
    // setLoading(true);
    axios
      .get(Urls.get.badgeRequestAll + `?page=${activePage}&search=${search}&limit=${limit}`)
      .then((res) => {
        console.log('all badge request', res);
        setBadgeRequestData(res?.data?.data);
        setActivePage(res?.data?.currentPage);
        setTotalPages(res?.data?.totalPages);
        setTotaldocs(res?.data?.totalDocs);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    allBadgeRequests();
  }, [activePage, search, limit]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setActivePage(1);
  };

  const handleLimit = (e) => {
    setLimit(e.target.value);
    setActivePage(1);
  };

  const handleStatus = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const payload = {
      badgeRequestId: __id,
      status: e.target.value
    };
    axios.post(Urls.post.statusChangeBadgeRequest, payload).then((res) => {
      console.log(res.data?.message);
      setStatusUpdate(true);
      setMessageShow(res.data?.message);
      setTimeout(() => {
        setStatusUpdate(false);
        allBadgeRequests();
      }, 2000);
    });
  };

  const [showModal, setShowModal] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle opening the modal with multiple images
  const handleShowModal = (images) => {
    setModalImages(images); // Set the images array
    setShowModal(true);
  };

  const handleCloseModal = () => {
  setShowModal(false);
  }

  // Handle print functionality for each image
  const handlePrintImage = (imageUrl) => {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write('<html><head><title>Print Image</title></head><body>');
    printWindow.document.write(`<img src="${imgUrl + imageUrl}" style="width:100%;height:100%;"/>`);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  // Handle download functionality for each image
  const handleDownloadImage = (imageUrl) => {
    const link = document.createElement('a');
    link.href = imgUrl + imageUrl;
    link.download = imageUrl.split('/').pop(); // Download the image with its filename
    link.click();
  };

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? modalImages.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === modalImages.length - 1 ? 0 : prevIndex + 1));
  };

  // Pagination button
  const pagesPerChunk = 5;
  const totalChunks = Math.ceil(totalPages / pagesPerChunk);

  const handleNextPagi = () => {
    if (currentChunk < totalChunks - 1) {
      setCurrentChunk(currentChunk + 1);
    }
  };
  const handlePrevPagi = () => {
    if (currentChunk > 0) {
      setCurrentChunk(currentChunk - 1);
    }
  };

  const handlePageClick  = (pageNumber) => {
   setActivePage(pageNumber)
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
              <Notification message={messageShow} />
            </b>
          ) : null}
        </div>
      </div>
      <div className="row pb-3">
        <div className="col-2 offset-10">
          <div className="d-flex justify-content-evenly align-items-center">
            <div className="text-dark">Limit</div>
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
                    <FaClipboardList
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
                    <b style={{ color: '#10446c' }}>User badge request list</b>
                  </Card.Title>
                </div>

                <div className="col-4 d-flex">
                  <Form.Group className="mb-3" as={Col} controlId="exampleForm.ControlSelect1">
                    <InputGroup>
                      <Form.Control
                        className="bg-white py-2 "
                        style={{ border: '1px solid #10446c' }}
                        onChange={handleSearch}
                        size="sm"
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
              ) : badgeRequestData?.length === 0 ? (
                <div className="text-center pt-3 pb-3">
                  <h6 className="text-danger">No data available ! 😥</h6>
                </div>
              ) : (
                <Table responsive hover bordered>
                  <thead className="tableHeader">
                    <tr className="text-center">
                      <th>Sr No.</th>
                      <th>User Name</th>
                      <th style={{ width: '160px', whiteSpace: 'normal', wordWrap: 'break-word' }}>Title</th>
                      <th>Badge Type</th>
                      <th>Status</th>
                      <th>Certificate</th>
                    </tr>
                  </thead>
                  {badgeRequestData.map((item, index) => {
                    return (
                      <tbody key={index} className="tableBody">
                        <tr>
                          <td className="text-center">{index + 1}</td>
                          <td>{item?.user?.name}</td>
                          <td style={{ width: '150px', whiteSpace: 'normal', wordWrap: 'break-word' }}>{item?.badge?.title}</td>
                          {/* <td>{item?.badge?.badgeType}</td> */}
                          <td style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {/* Display the image based on the badgeType */}
                            {item?.badge?.badgeType === 'insurance' && (
                              <img src={InsuranceImg} alt="Insurance" style={{ width: '20px', height: '20px' }} />
                            )}
                            {item?.badge?.badgeType === 'identity' && (
                              <img src={Verify_identityImg} alt="identity" style={{ width: '20px', height: '20px' }} />
                            )}
                            {item?.badge?.badgeType === 'journeyperson' && (
                              <img src={JourneypersonImg} alt="Journeyperson" style={{ width: '20px', height: '20px' }} />
                            )}
                            {/* Display the badge type text */}
                            {item?.badge?.badgeType ? item?.badge?.badgeType : 'NA'}
                          </td>
                          <td className="text-center">
                            <select
                              className="btn btn-light p-1 dropdown-toggle"
                              style={{ border: '1px solid #10446c' }}
                              onChange={handleStatus}
                              onClick={() => setId(item._id)}
                              value={item?.approved}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>

                          <td className="text-center">
                            {/* Check if certificate exists */}
                            {item?.certificate ? (
                              (Array.isArray(item.certificate) ? item.certificate : [item.certificate]) // Normalize to an array
                                .some((cert) => ['.jpg', '.jpeg', '.png', '.webp'].some((ext) => cert.toLowerCase().endsWith(ext))) ? (
                                <Button
                                  style={{ backgroundColor: '#327cb3', border: 'none' }}
                                  size="sm"
                                  onClick={() =>
                                    handleShowModal(
                                      Array.isArray(item.certificate) ? item.certificate : [item.certificate] // Ensure it's always an array
                                    )
                                  } // Open modal for single or multiple images
                                >
                                  <FontAwesomeIcon icon={faEye} />
                                </Button>
                              ) : (
                                'NA' // Display 'NA' if not an image
                              )
                            ) : (
                              'NA' // Display 'NA' if certificate is undefined
                            )}
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
                      onClick={handlePrevPagi}
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
                          className={activePage == value ? 'btn btn-sm btn-primary rounded-circle' : 'btn btn-sm btn-dark'}
                          onClick={() => handlePageClick(value)}
                        >
                          {value}
                        </button>
                      );
                    })}

                    <Button
                      onClick={handleNextPagi}
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
                      <Pagination.Item key={index} onClick={() => setActivePage(index + 1)}>
                        {index + 1}
                      </Pagination.Item>
                    ))}
                </Pagination>
              </Card> */}
            </Card.Body>
          </Card>

          <Modal show={showModal} onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
              <Modal.Title style={{ color: '#10446c' }}>Certificates</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Carousel for image sliding */}
              <Carousel activeIndex={activeIndex} onSelect={handleSelect}>
                {modalImages.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={imgUrl + image}
                      alt={`image-${index}`}
                      style={{ objectFit: 'contain', height: '400px' }} // Adjust height and fit
                    />
                    <Carousel.Caption>
                      {/* Download Button */}
                      <Button variant="danger" size="sm" onClick={() => handleDownloadImage(image)} style={{ marginRight: '10px' }}>
                        <FontAwesomeIcon icon={faDownload} />
                      </Button>
                      {/* Print Button */}
                      <Button variant="success" size="sm" onClick={() => handlePrintImage(image)}>
                        <FontAwesomeIcon icon={faPrint} />
                      </Button>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
              {/* Navigation Buttons */}
              <div className="d-flex justify-content-between mt-3">
                <Button variant="info" size="sm" onClick={handlePrev}>
                  Previous
                </Button>
                <Button variant="info" size="sm" onClick={handleNext}>
                  Next
                </Button>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" size="sm" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </div>
  );
}

{
  /* <td className="text-center">
                            {item?.certificate &&
                            ['.jpg', '.jpeg', '.png', '.pdf', '.docx', 'webp'].some((ext) =>
                              item.certificate.toLowerCase().endsWith(ext)
                            ) ? (
                              <Button style={{backgroundColor:"#327cb3" , border:"none"}} size="sm" onClick={() => handleShowModal(imgUrl + item.certificate)}>
                                <FontAwesomeIcon icon={faEye} />
                              </Button>
                            ) : (
                              'NA'
                            )}

                            <a
                              href={imgUrl + item.certificate}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ marginLeft: '5px' }}
                            >
                              <Button variant="danger" size="sm">
                                <FontAwesomeIcon icon={faDownload} />
                              </Button>
                            </a>

                      
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => handlePrintFile(imgUrl + item.certificate)}
                              style={{ marginLeft: '5px' }}
                            >
                              <FontAwesomeIcon icon={faPrint} />
                            </Button>
                          </td> */
}

{
  /* <td className="text-center">
                          {item?.certificate &&
                          ['.jpg', '.jpeg', '.png', '.pdf', '.docx', 'webp'].some((ext) => item.certificate.toLowerCase().endsWith(ext)) ? (
                            <Button variant="info" size="sm" onClick={() => window.open(imgUrl + item.certificate, '_blank')}>
                              <FontAwesomeIcon icon={faCircleInfo} />
                            </Button>
                          ) : (
                            'NA'
                          )}
                        </td> */
}
{
  /* <td className="text-center">
                            {item?.certificate && item?.certificate.toLowerCase().endsWith('.jpg') ? (
                              <Link to={imgUrl + item.certificate} target="_blank" download>
                                <Button variant="info" size="sm">
                                  <FontAwesomeIcon icon={faCircleInfo} />
                                </Button>
                              </Link>
                            ) : (
                              'NA'
                            )}
                          </td> */
}
