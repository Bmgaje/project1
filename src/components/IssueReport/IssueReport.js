import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Row, Col, Card, Table, InputGroup, Form, Button } from 'react-bootstrap';
import { Urls } from '../../helpers/Urls';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { FaFileAlt } from 'react-icons/fa';
import 'animate.css';
import '../IssueReport/css/issuereport.css';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function IssueReport() {
  const navigate = useNavigate();
  const location = useLocation();

  let [reportData, setReportData] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [activePage, setActivePage] = useState(location?.state?.activePage || 1);
  const [limit, setLimit] = useState(location?.state?.limit || 10);
  const [search, setSearch] = useState('');
  let [loading, setLoading] = useState(false);

  let [totaldocs, setTotaldocs] = useState('');
  let [currentChunk, setCurrentChunk] = useState(0);

  function getReport() {
    setLoading(true);
    axios
      .get(Urls.get.getAllIssueReport + `?page=${activePage}&limit=${limit}&q=${search}`)
      .then((res) => {
        console.log('report data', res);
        setReportData(res?.data?.data?.docs);
        setActivePage(res?.data?.data?.page);
        setTotalPages(res?.data?.data?.totalPages);
        setTotaldocs(res?.data?.data?.totalDocs);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    getReport();
  }, [activePage, limit, search]);

  const handleLimit = (e) => {
    setLimit(e.target.value);
    setActivePage(1);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
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
      <Row className="mainIssue animate__animated animate__fadeInRight">
        <Col>
          <Card style={{ borderRadius: 15, border: '1px solid #10446c' }}>
            <Card.Header
              style={{
                borderBottom: '1px dashed #10446c'
              }}
            >
              <Row>
                <div className="col-8 pt-1">
                  <Card.Title as="h4">
                    <FaFileAlt
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
                    <b style={{ color: '#10446c' }}>Issue Report Table</b>
                  </Card.Title>
                </div>
                <div className="col-3 d-flex">
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
              ) : reportData?.length === 0 ? (
                <div className="text-center pt-3 pb-3">
                  <h6 className="text-danger">No data available ! 😥</h6>
                </div>
              ) : (
                <Table responsive hover bordered>
                  <thead className="text-center tableHeader">
                    <tr>
                      <th>Sr No.</th>
                      <th>Reported By</th>
                      <th>Report</th>
                      <th>Create At</th>
                      <th>Information</th>
                    </tr>
                  </thead>
                  {reportData?.map((item, index) => {
                    return (
                      <tbody key={index} className="text-center tableBody">
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item?.reported_by?.name}</td>
                          {item.post && (
                            <>
                              <td>
                                <h6>
                                  Reported on <b>Post</b>
                                </h6>
                                <h6>{item.post?.content}</h6>
                                <h6>
                                  By <b> {item?.post?.user?.name}</b>
                                </h6>
                              </td>
                            </>
                          )}
                          {item.project && (
                            <>
                              <td>
                                <h6>
                                  Reported on <b>Project</b>
                                </h6>
                                <h6>{item.project?.project_title}</h6>
                                <h6>
                                  By <b>{item?.project?.user?.name}</b>
                                </h6>
                              </td>
                            </>
                          )}
                          {item.group && (
                            <>
                              <td>
                                <h6>
                                  Reported on <b> Group</b>
                                </h6>
                                <h6>{item.group?.group_name}</h6>
                                <h6>
                                  by <b>{item.group?.members?.length}</b> members.
                                </h6>
                              </td>
                            </>
                          )}
                          <td>
                            {item.post && <p>{moment(item.post?.createdAt).format('DD-MM-YYYY HH:mm:ss')}</p>}
                            {item.project && <p>{moment(item.project?.createdAt).format('DD-MM-YYYY HH:mm:ss')}</p>}
                            {item.group && <p>{moment(item.group?.createdAt).format('DD-MM-YYYY HH:mm:ss')}</p>}
                          </td>
                          <td className="text-center">
                            <Link to={'/issueDetails/' + item?._id} state={{activePage, limit}}>
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

              {/* <Card title="Pagination" className="d-flex justify-content-center align-items-center pt-2">
                <Pagination className="mt-3">
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
      </Row>
    </div>
  );
}
