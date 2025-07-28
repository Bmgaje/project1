import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Form, InputGroup, Button } from 'react-bootstrap';
import '../projectTransaction/css/payment.css';
// import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';
import { FaFileInvoiceDollar } from 'react-icons/fa6';
import axios from 'axios';
import { Urls } from '../../helpers/Urls';
import ScaleLoader from 'react-spinners/ScaleLoader';

function ProjectWisePayment() {
  const navigate = useNavigate();
  const location = useLocation();

  const [totalPages, setTotalPages] = useState(null);
  const [activePage, setActivePage] = useState(location?.state?.activePage || 1);
  const [limit, setLimit] = useState(location?.state?.limit || 10);

  let [milestoneInfo, setMilestoneInfo] = useState([]);
  const [search, setSearch] = useState('');
  let [loading, setLoading] = useState(false);

  let [totaldocs, setTotaldocs] = useState('');
  let [currentChunk, setCurrentChunk] = useState(0);

  function AllMilestonesInfo() {
    setLoading(true);
    axios
      .get(Urls.get.getAllMilestonesList + `?page=${activePage}&limit=${limit}&search=${search}`)
      .then((res) => {
        console.log('Milestone all info:)', res);
        setMilestoneInfo(res?.data?.data);
        setTotalPages(res.data?.totalPages);
        setActivePage(res.data?.currentPage);
        setTotaldocs(res?.data?.totalDocs);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    AllMilestonesInfo();
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
      <Row className="main animate__animated animate__fadeInRight">
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
                    <FaFileInvoiceDollar
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
                    <b style={{ color: '#10446c' }}>Project Milestones and Payments</b>
                  </Card.Title>
                </div>

                <div className="col-4 d-flex">
                  <Form.Group className="mb-3" as={Col} controlId="exampleForm.ControlSelect1">
                    <InputGroup>
                      <Form.Control
                        className="bg-white py-2"
                        onChange={handleSearch}
                        style={{ border: '1px solid #10446c' }}
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
              ) : milestoneInfo?.length === 0 ? (
                <div className="text-center pt-3 pb-3">
                  <h6 className="text-danger">No data available ! 😥</h6>
                </div>
              ) : (
                <Table responsive hover bordered>
                  <thead className="tableHeader">
                    <tr className="text-center">
                      <th>Sr No.</th>
                      <th>Project Name</th>
                      <th>Owner Name</th>
                      <th>Contractor</th>
                      <th>Milestones Completed</th>
                      {/* <th>Milestone Status</th> */}
                      <th>Information</th>
                    </tr>
                  </thead>
                  {milestoneInfo?.map((item, index) => {
                    return (
                      <tbody key={index} className="tableBody">
                        <tr>
                          <td className="text-center">{index + 1}</td>
                          <td>{item?.projectName}</td>
                          <td>{item?.ownerName}</td>
                          <td>{item?.contractorName}</td>
                          <td className="text-center">{item?.paidMilestones}</td>
                          <td className="text-center">
                            <Link to={'/projectwisepaymentDetails/' + item.productId} state={{ activePage, limit }}>
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
        </Col>
      </Row>
    </div>

    // <div className="container mt-4">
    //   <Table bordered hover responsive>
    //     <thead className="table-dark">
    //       <tr>
    //         <th>#</th>
    //         <th>Project Name</th>
    //         <th>Contractor</th>
    //         <th>Total Budget</th>
    //         <th>Milestones Completed</th>
    //         <th>Milestone Status</th>
    //         <th>Payments Done</th>
    //         <th>Remaining Budget</th>
    //         <th>Status</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {projects.map((project, index) => (
    //         <tr key={project.project_id}>
    //           <td>{index + 1}</td>
    //           <td>{project.project_name}</td>
    //           <td>{project.contractor_name}</td>
    //           <td>₹{project.budget}</td>
    //           <td>
    //             {project.milestonesCompleted}/{project.totalMilestones}
    //           </td>
    //           <td>
    //             <ProgressBar
    //               now={(project.milestonesCompleted / project.totalMilestones) * 100}
    //               label={`${Math.round((project.milestonesCompleted / project.totalMilestones) * 100)}%`}
    //             />
    //           </td>
    //           <td>₹{project.paymentsDone}</td>
    //           <td>₹{project.budget - project.paymentsDone}</td>
    //           <td>
    //             <span
    //               className={`badge ${
    //                 project.status === 'Ongoing' ? 'bg-warning' : project.status === 'Completed' ? 'bg-success' : 'bg-secondary'
    //               }`}
    //             >
    //               {project.status}
    //             </span>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </Table>
    // </div>
  );
}

export default ProjectWisePayment;

{
  /* <td>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center', 
                              alignItems: 'center', 
                              height: '100%' 
                            }}
                          >
                            <div style={{ width: '43px', height: '43px' }}>
                              <CircularProgressbar
                                value={(item.milestonesCompleted / item.totalMilestones) * 100}
                                text={`${Math.round((item.milestonesCompleted / item.totalMilestones) * 100)}%`}
                                styles={buildStyles({
                                  textColor: '#000', 
                                  pathColor:
                                    (item.milestonesCompleted / item.totalMilestones) * 100 >= 100
                                      ? 'green'
                                      : (item.milestonesCompleted / item.totalMilestones) * 100 >= 75
                                      ? 'orange'
                                      : (item.milestonesCompleted / item.totalMilestones) * 100 >= 50
                                      ? 'blue'
                                      : (item.milestonesCompleted / item.totalMilestones) * 100 >= 25
                                      ? 'purple'
                                      : 'red',
                                  trailColor: '#f5f5f5' 
                                })}
                              />
                            </div>
                          </div>
                        </td> */
}
