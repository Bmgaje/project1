import React, { useEffect, useState } from 'react';
import { Row, Col, Card, InputGroup, Form, Table, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';
import { RiBankFill } from 'react-icons/ri';
import '../transaction/css/transaction.css';
import axios from 'axios';
import { Urls } from '../../helpers/Urls';
import ScaleLoader from 'react-spinners/ScaleLoader';

function BankDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  let [details, setDetails] = useState([]);
  let [search, setSearch] = useState('');

  const [totalPages, setTotalPages] = useState(null);
  const [activePage, setActivePage] = useState(location?.state?.activePage || 1);
  const [limit, setLimit] = useState(location?.state?.limit || 10);
  let [loading, setLoading] = useState(false);

  let [totaldocs, setTotaldocs] = useState('');
  let [currentChunk, setCurrentChunk] = useState(0);

  function bankdetails() {
    setLoading(true);
    axios
      .get(Urls.get.userBankDetails + `?page=${activePage}&limit=${limit}&isPrimary=true&q=${search}`)
      .then((res) => {
        console.log('Bank details:)', res);
        setDetails(res?.data?.data);
        setTotalPages(res.data?.totalPages);
        setActivePage(res.data?.currentPage);
        setTotaldocs(res?.data?.totalDocs);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    bankdetails();
  }, [activePage, limit, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setActivePage(1);
  };

  const handleLimit = (e) => {
    setLimit(e.target.value);
    setActivePage(1);
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
      <Row className="mainBankDetails animate__animated animate__fadeInRight">
        <Col>
          <Card style={{ borderRadius: 15, border: '1px solid #10446c' }}>
            <Card.Header
              style={{
                borderBottom: '1px dashed #10446c'
              }}
            >
              <Row>
                <div className="col-8">
                  <Card.Title as="h4">
                    <RiBankFill
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
                    <b style={{ color: '#10446c' }}>Bank Details Table</b>
                  </Card.Title>
                </div>
                <div className="col-3 ">
                  <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
                    <InputGroup>
                      <Form.Control
                        className="bg-white py-2 "
                        size="sm"
                        onChange={handleSearch}
                        style={{ border: '1px solid #10446c' }}
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
              ) : details?.length === 0 ? (
                <div className="text-center pt-3 pb-3">
                  <h6 className="text-danger">No data available ! 😥</h6>
                </div>
              ) : (
                <Table responsive hover bordered>
                  <thead className="tableHeader">
                    <tr className="text-center">
                      <th>Sr No.</th>
                      <th>Customer Name</th>
                      <th>Bank Name (Primary A/c)</th>
                      <th>Information</th>
                    </tr>
                  </thead>
                  {details?.map((item, index) => {
                    return (
                      <tbody key={index} className="tableBody">
                        <tr>
                          <td className="text-center">{index + 1}</td>
                          <td>{item?.accountHolderName}</td>
                          <td>{item?.bankName}</td>
                          <td className="text-center">
                            <Link to={'/bankdetailsview/' + item?._id} state={{ activePage, limit }}>
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
            </Card.Body>
          </Card>
        </Col>

        {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete the skill ?</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" size="sm" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={deleteBTN}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal> */}
      </Row>
    </div>
  );
}

export default BankDetails;
