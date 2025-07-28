import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Urls } from '../../helpers/Urls';
import Select from 'react-select';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { AiFillProject } from 'react-icons/ai';
import 'animate.css';
import '../project/css/project.css';
import ScaleLoader from 'react-spinners/ScaleLoader';

export default function ProjectList() {
  const navigate = useNavigate();
  const location = useLocation();

  const [projectData, setProjectData] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [activePage, setActivePage] = useState(location?.state?.activePage || 1);
  const [limit, setLimit] = useState(location?.state?.limit || 10);

  let [searchUser, setSearchUser] = useState('');
  let limitUser = 50;
  let [loading, setLoading] = useState(false);

  let [userData, setUserData] = useState([]);
  let [userId, setUserId] = useState('');
  let [selectedUser, setSelectedUser] = useState(null); // Store selected user object

  let [totaldocs, setTotaldocs] = useState('');
  let [currentChunk, setCurrentChunk] = useState(0);

  function getProject() {
    setLoading(true);
    axios
      .get(Urls.get.getAllProject + `?page=${activePage}&limit=${limit}&is_delete=no&user=${userId}`)
      .then((res) => {
        console.log('project list', res);
        const projects = res?.data?.data?.docs || [];
        setProjectData(projects);
        setTotalPages(res?.data?.data?.totalPages);
        setActivePage(res?.data?.data?.page);
        setTotaldocs(res?.data?.data?.totalDocs);
      })
      .finally(() => setLoading(false));
  }

  function getUsers() {
    axios.get(Urls.get.getAllUsers + `?is_delete=no&q=${searchUser || userId}&limit=${limitUser}`).then((res) => {
      console.log('user list', res);
      const users = res?.data?.data || [];
      // Add "Show All" option to userData
      setUserData([{ label: 'Show All', value: '' }, ...users.map((user) => ({ label: user.name, value: user._id }))]);
    });
  }

  useEffect(() => {
    getProject();
  }, [activePage, limit, userId]);

  useEffect(() => {
    getUsers();
  }, [searchUser, userId]);

  const handleLimit = (e) => {
    setLimit(e.target.value);
    setActivePage(1);
  };

  const handleUserChange = (selectedOption) => {
    setUserId(selectedOption?.value || ''); // Update userId based on selected value
    setSelectedUser(selectedOption); // Store the selected user for display
    setSearchUser(''); // Clear search when a user is selected
    setActivePage(1); // Reset to first page when changing user filter
  };

  const handleSearchInput = (inputS) => {
    if (!userId) {
      setSearchUser(inputS); // Allow search only when no user is selected
      setActivePage(1);
    }
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
      <Row className="mainProject animate__animated animate__fadeInRight">
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
                    <AiFillProject
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
                    <b style={{ color: '#10446c' }}>Project List </b>
                  </Card.Title>
                </div>
                <div className="col-3 ">
                  <Form.Label style={{ fontWeight: 'bold', color: '#10446c' }}>Search by user</Form.Label>
                  <Form.Group className="mb-3" as={Col} controlId="exampleForm.ControlSelect1">
                    <div>
                      <Select
                        value={selectedUser} // Show selected user in input box
                        onChange={handleUserChange} // Handle selection of user
                        options={userData} // User data for options
                        onInputChange={handleSearchInput} // Handle user search input
                        placeholder="Search..."
                        isSearchable
                      />
                    </div>
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
              ) : projectData?.length === 0 ? (
                <div className="text-center pt-3 pb-3">
                  <h6 className="text-danger">No data available ! 😥</h6>
                </div>
              ) : (
                <>
                  <Table responsive hover bordered>
                    <thead className="tableHeader">
                      <tr className="text-center">
                        <th>Sr No.</th>
                        <th>Project Title</th>
                        <th>Users</th>
                        <th>Information</th>
                      </tr>
                    </thead>
                    {projectData?.map((item, index) => {
                      return (
                        <tbody key={index} className="tableBody">
                          <tr>
                            <td className="text-center">{index + 1}</td>
                            <td>{item?.project_title}</td>
                            <td>{item?.user?.name}</td>
                            <td className="text-center">
                              <Link to={'/projectDetails/' + item?._id} state={{ url2: '/project', activePage, limit }}>
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
                </>
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

              {/* <Card title="Pagination" className="mt-4 d-flex justify-content-center align-items-center">
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
