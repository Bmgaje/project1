import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Card, Row, Form, Col, Button, Image, Table } from 'react-bootstrap';
import { Urls, imgUrl } from '../../helpers/Urls';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import ScaleLoader from 'react-spinners/ScaleLoader';
import '../project/css/project.css'

export default function ProjectDetails() {
  const navigate = useNavigate();

  let [projectData, setProjectData] = useState([]);
  let [bidsData, setBidsData] = useState([]);
  const params = useParams();

  const location = useLocation();
  const pageBack = location?.state?.activePage;
  const limitBack = location?.state?.limit;
  console.log('check url path:)', location);

  const [totalPages, setTotalPages] = useState(null);
  const [bidPage, setBidPage] = useState(1);
  const [bidLimit, setBidLimit] = useState(1);
  let [loading, setLoading] = useState(false);

  let [totaldocs, setTotaldocs] = useState('');
  let [currentChunk, setCurrentChunk] = useState(0);

  function getSingleProjectDetails() {
    axios.get(Urls.get.getSingleProject + params.id).then((res) => {
      console.log('Single project details:)', res?.data?.data?.project?.bids);
      setProjectData(res?.data?.data?.project);
    });
  }

  function getAllBids() {
    setLoading(true);
    axios
      .get(Urls.get.getSingleBidsData + params.id + `?page=${bidPage}&limit=${bidLimit}`)
      .then((res) => {
        console.log('all bids', res?.data?.data);
        setBidsData(res?.data?.data?.docs);
        setTotalPages(res?.data?.data?.totalPages);
        setBidPage(res?.data?.data?.page);
        setTotaldocs(res?.data?.data?.totalDocs);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getSingleProjectDetails();
    getAllBids();
  }, [bidPage, bidLimit]);

  const handleLimit = (e) => {
    setBidLimit(e.target.value);
    setBidPage(1);
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

  // const handlePageClick = (pageNumber) => {
  //   setBidPage(pageNumber);
  //   navigate(location.pathname, { replace: true, state: pageNumber });
  // };

  const handlePageClick = (pageNumber) => {
    setBidPage(pageNumber);
    navigate(location.pathname, {
      state: {
        ...location.state,  
        pageBack: pageNumber,
      },
    });
  };

  const chunkStartPage = currentChunk * pagesPerChunk + 1;
  const chunkEndPage = Math.min(chunkStartPage + pagesPerChunk - 1, totalPages);
  const pages = [];
  for (let i = chunkStartPage; i <= chunkEndPage; i++) {
    pages.push(i);
  }

  // Showing of 1 to 10 of 100 entries.
  const indexOfLastEntry = bidPage * bidLimit;
  const indexOfFirstEntry = indexOfLastEntry - bidLimit;

  const startEntry = indexOfFirstEntry + 1;
  const endEntry = Math.min(indexOfLastEntry, totaldocs);

  return (
    <div>
      <Row>
        <Col xs="auto" className="my-3">
          <Link to={location?.state?.url || location?.state?.url2} state={{ activePage: pageBack, limit: limitBack }}>
            <Button variant="danger" size="sm">
              Back
            </Button>
          </Link>
        </Col>
      </Row>
      {/* **************Project information****************** */}
      <Row>
        <div>
          <Card>
            <Card.Header style={{ backgroundColor: '#10446c' }}>
              <div className="container d-flex align-items-center">
                <h4 className=" text-light" style={{ letterSpacing: '3px', fontWeight: '300' }}>
                  Project Information
                </h4>
              </div>
            </Card.Header>
            <Card.Body>
              <Row>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Image</Form.Label>
                    <div>
                      {projectData?.attachments?.length > 0 ? (
                        <Image src={imgUrl + projectData.attachments[0]} style={{ height: '50px', width: '50px', borderRadius: '50%' }} />
                      ) : (
                        <div>No image available</div>
                      )}
                    </div>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Project Name</Form.Label>
                    <p>{projectData?.project_title ? projectData?.project_title : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Start Date</Form.Label>
                    {/* <p>{projectData?.start_date}</p> */}
                    <p>{moment(projectData?.start_date).format('DD-MM-YYYY')}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>End Date</Form.Label>
                    {/* <p>{projectData?.end_date}</p> */}
                    <p>{moment(projectData?.end_date).format('DD-MM-YYYY')}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Current Status</Form.Label>
                    <p>{projectData?.current_status ? projectData?.current_status : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Status</Form.Label>
                    <p>{projectData?.status ? projectData?.status : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Close Bidding Date</Form.Label>
                    <p>{moment(projectData?.close_bidding_date).format('DD-MM-YYYY')}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Visibility</Form.Label>
                    <p>{projectData?.visibility ? projectData?.visibility : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>City</Form.Label>
                    <p>{projectData?.city ? projectData?.city : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Location</Form.Label>
                    <p>{projectData?.location ? projectData?.location : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Longitude</Form.Label>
                    <p>{projectData?.long ? projectData?.long : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Latitude</Form.Label>
                    <p>{projectData?.lat ? projectData?.lat : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Linner Feet (Length)</Form.Label>
                    <p>{projectData?.linear_feet?.length ? projectData?.linear_feet?.length : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Description</Form.Label>
                    <p>{projectData?.linear_feet?.description ? projectData?.linear_feet?.description : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Square Feet (Area)</Form.Label>
                    <p>{projectData?.square_feet?.area ? projectData?.square_feet?.area : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Description</Form.Label>
                    <p>{projectData?.square_feet?.description ? projectData?.square_feet?.description : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Trade Category</Form.Label>
                    <p>{projectData?.tradeCategory?.map((item) => item?.title).join(', ')}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Trade Type Category</Form.Label>
                    <p>{projectData?.tradeTypeCat?.map((item) => item?.title).join(', ')}</p>
                  </Form.Group>
                </div>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </Row>

      {/* **************User information****************** */}
      <Row>
        <div className="col-12">
          <Card>
            <Card.Header style={{ backgroundColor: '#10446c' }}>
              <div className="container d-flex align-items-center">
                <h4 className=" text-light" style={{ letterSpacing: '3px', fontWeight: '300' }}>
                  User Infomation
                </h4>
              </div>
            </Card.Header>
            <Card.Body>
              <Row>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Profiel Pic</Form.Label>
                    <div>
                      {projectData?.user?.profilePic?.length > 0 ? (
                        <Image
                          src={imgUrl + projectData?.user?.profilePic}
                          style={{ height: '50px', width: '50px', borderRadius: '50%' }}
                        />
                      ) : (
                        <div>No image available</div>
                      )}
                    </div>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Name</Form.Label>
                    <p>{projectData?.user?.name ? projectData?.user?.name : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>User Name</Form.Label>
                    <p>{projectData?.user?.username ? projectData?.user?.username : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Email</Form.Label>
                    <p>{projectData?.user?.email ? projectData?.user?.email : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Mobile No.</Form.Label>
                    <p>{projectData?.user?.mob_no ? projectData?.user?.mob_no : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Gender</Form.Label>
                    <p>{projectData?.user?.gender ? projectData?.user?.gender : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Rating</Form.Label>
                    <p>{projectData?.user?.totalRating ? projectData?.user?.totalRating : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Status</Form.Label>
                    <p>{projectData?.user?.status ? projectData?.user?.status : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Company Name</Form.Label>
                    <p>{projectData?.user?.company_name ? projectData?.user?.company_name : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-3">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Location</Form.Label>
                    <p>{projectData?.user?.location ? projectData?.user?.location : 'NA'}</p>
                  </Form.Group>
                </div>
                <div className="col-12">
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>About</Form.Label>
                    <p>{projectData?.user?.about ? projectData?.user?.about : 'NA'}</p>
                  </Form.Group>
                </div>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </Row>

      {/* **************Biding information****************** */}

      <Row className="mainBid">
        <div className="col-12">
          <Card>
            <Card.Header style={{ backgroundColor: '#10446c' }}>
              <div className="container d-flex align-items-center">
                <h4 className=" text-light" style={{ letterSpacing: '3px', fontWeight: '300' }}>
                  Bidding Infomation
                </h4>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="row pb-3">
                <div className="col-2 offset-10">
                  <div className="d-flex justify-content-evenly align-items-center">
                    <div className="text-dark">Limit :</div>
                    <div>
                      <select className="btn btn-light p-1" style={{ border: '1px solid #10446c' }} onChange={handleLimit} value={bidLimit}>
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
              {loading ? (
                <div className="text-center">
                  <ScaleLoader color="#10446c" />
                  <h6 className="text-danger mt-3">Loading.....</h6>
                </div>
              ) : bidsData?.length === 0 ? (
                <div className="text-center pt-3 pb-3">
                  <h6 className="text-danger">No data available ! 😥</h6>
                </div>
              ) : (
                <Table responsive hover bordered>
                  <thead className="text-center tableHeaderBid">
                    <tr>
                      <th>Sr No.</th>
                      <th>Introduction</th>
                      <th>Total budget</th>
                      <th>Transaction fees</th>
                      <th>Status</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Agreement</th>
                    </tr>
                  </thead>
                  {bidsData?.map((item, index) => {
                    return (
                      <tbody key={index} className="tableBodyBid">
                        <tr>
                          <td className="text-center">{index + 1}</td>
                          <td>{item?.introduction ? item?.introduction : 'NA'}</td>
                          <td>{item?.total_budget ? item?.total_budget : 'NA'}</td>
                          <td>{item?.transaction_fees ? item?.transaction_fees : 'NA'}</td>
                          <td>{item?.status ? item?.status : 'NA'}</td>
                          <td>{moment(item?.projected_start_date).format('DD-MM-YYYY')}</td>
                          <td>{moment(item?.projected_end_date).format('DD-MM-YYYY')}</td>
                          <td className="text-center">
                            {item?.agreement && item?.agreement.toLowerCase().endsWith('.pdf') ? (
                              <Link to={imgUrl + item.agreement} target="_blank" download>
                                <Button style={{ backgroundColor: '#327cb3', border: 'none' }} size="sm">
                                  <FontAwesomeIcon icon={faCircleInfo} />
                                </Button>
                              </Link>
                            ) : (
                              'NA'
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
                          className={bidPage === value ? 'btn btn-sm btn-primary rounded-circle' : 'btn btn-sm btn-dark'}
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
        </div>
      </Row>
    </div>
  );
}
// ------------------------- dummy data of bids ------------------------
// {
//   projectData?.bids?.map((item, index) => {
//     return (
//       <tbody key={index}>
//         <tr className="text-center">
//           <td>{index + 1}</td>
//           <td>{item?.introduction ? item?.introduction : 'NA'}</td>
//           <td>{item?.total_budget ? item?.total_budget : 'NA'}</td>
//           <td>{item?.transaction_fees ? item?.transaction_fees : 'NA'}</td>
//           <td>{item?.status ? item?.status : 'NA'}</td>
//           <td>{moment(item?.projected_start_date).format('DD-MM-YYYY')}</td>
//           <td>{moment(item?.projected_end_date).format('DD-MM-YYYY')}</td>
//           <td className="text-center">
//                           <Link to={imgUrl + item?.agreement} target="_blank" download>
//                             <Button variant="info" size="sm">
//                               <FontAwesomeIcon icon={faCircleInfo} />
//                             </Button>
//                           </Link>
//                         </td>
//           <td className="text-center">
//             {item?.agreement && item?.agreement.toLowerCase().endsWith('.pdf') ? (
//               <Link to={imgUrl + item.agreement} target="_blank" download>
//                 <Button variant="info" size="sm">
//                   <FontAwesomeIcon icon={faCircleInfo} />
//                 </Button>
//               </Link>
//             ) : (
//               'NA'
//             )}
//           </td>
//         </tr>
//       </tbody>
//     );
//   });
// }
