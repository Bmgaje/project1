import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import '../dashboard/css/dashboard.css';
import { FaUsers } from 'react-icons/fa';
import { IoDocuments } from 'react-icons/io5';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import { defaults } from 'chart.js/auto';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { Urls } from '../../helpers/Urls';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import 'animate.css';
import ScaleLoader from 'react-spinners/ScaleLoader';
import moment from 'moment';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import PropTypes from 'prop-types';
import { enGB } from 'date-fns/locale';
import errorHandler from '../../helpers/errorHandler';
import instance from '../../helpers/axiosInstance';

// Register required components for Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = 'start';
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = 'black';

const DashDefault = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countScroll, setCountScroll] = useState(false);
  const [projectStatus, setProjectStatus] = useState();
  const [userStatus, setUserStatus] = useState();
  const [totals, setTotals] = useState();

  useEffect(() => {
    getProjectStatus('2024-01-01', '2025-12-12');
    getUserStatus('2024-01-01', '2025-12-12');
    getTotals();
    getProject();
  }, []);

  function getTotals() {
    instance
      .get(`api/dashboard/totals`)
      .then((res) => setTotals(res?.data))
      .catch(errorHandler);
  }

  function getUserStatus(start, end) {
    instance
      .get(`api/dashboard/user-status?startDate=${start}&endDate=${end}`)
      .then((res) => setUserStatus(res?.data))
      .catch(errorHandler);
  }

  function getProjectStatus(start, end) {
    instance
      .get(`api/dashboard/project-status?startDate=${start}&endDate=${end}`)
      .then((res) => setProjectStatus(res?.data))
      .catch(errorHandler);
  }

  function getProject() {
    setLoading(true);
    axios
      .get(`${Urls.get.getAllProject}?limit=5`)
      .then((res) => setProjectData(res?.data?.data?.docs))
      .finally(() => setLoading(false));
  }

  const data = {
    labels: Object?.keys(projectStatus?.project || {}),
    datasets: [
      {
        label: 'Dataset 1',
        data: Object?.values(projectStatus?.project || {}),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        tension: 0.4 // Makes the line slightly curved
      }
    ]
  };

  // Define chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true // Start the y-axis at 0
      }
    }
  };

  const label = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  return (
    <React.Fragment>
      <div>
        <ScrollTrigger onEnter={() => setCountScroll(true)} onExit={() => setCountScroll(false)}>
          <div className="pt-3 cardMain" id="cardMain">
            <div className="animate__animated animate__fadeInDown">
              <div className="cardColor">
                <div className=" d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <h3 className="mb-0" style={{ color: '#10446c' }}>
                      <FaUsers className="cardDesign" />
                    </h3>
                    <h4 className="mx-2 mb-0" style={{ color: '#10446c' }}>
                      Total Users
                    </h4>
                  </div>
                </div>
                <div>
                  <h3 className="pt-2" style={{ color: '#10446c', fontWeight: 900 }}>
                    {countScroll && <CountUp start={0} end={totals?.totalUsers || 10} />}
                  </h3>
                </div>
              </div>
            </div>

            <div className="animate__animated animate__fadeInDown">
              <div className="cardColor">
                <div className=" d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <h3 className="mb-0" style={{ color: '#10446c' }}>
                      <FaUsers className="cardDesign" />
                    </h3>
                    <h4 className="mx-2 mb-0" style={{ color: '#10446c' }}>
                      Total Projects
                    </h4>
                  </div>
                </div>
                <div>
                  <h3 className="pt-2" style={{ color: '#10446c', fontWeight: 900 }}>
                    {countScroll && <CountUp start={0} end={totals?.totalProjects || 10} />}
                  </h3>
                </div>
              </div>
            </div>

            <div className="animate__animated animate__fadeInUp">
              <div className="cardColor">
                <div className=" d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <h3 className="mb-0" style={{ color: '#10446c' }}>
                      <IoDocuments className="cardDesign" />
                    </h3>
                    <h4 className="mx-2 mb-0" style={{ color: '#10446c' }}>
                      Total Posts
                    </h4>
                  </div>
                </div>
                <div>
                  <h3 className="pt-2" style={{ color: '#10446c', fontWeight: 900 }}>
                    {countScroll && <CountUp start={0} end={totals?.totalPosts || 50} />}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </ScrollTrigger>

        {/* latest project top bids */}
        <Row className="mainTable animate__animated animate__fadeInRight">
          <Col>
            <Card style={{ borderRadius: 15, border: '1px solid #10446c' }} className="mt-3">
              <Card.Header
                style={{
                  position: 'relative',
                  borderBottom: '1px dashed #10446c'
                }}
              >
                <div className="col-6 pt-1">
                  <Card.Title as="h4">
                    <IoDocuments
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
                    <b style={{ color: '#10446c' }}>Latest Project</b>
                  </Card.Title>
                </div>
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
                          <tr className="text-center">
                            <td className="text-center">{index + 1}</td>
                            <td>{item?.project_title}</td>
                            <td>{item?.user?.name}</td>
                            <td className="text-center">
                              <Link to={'/projectDetails/' + item?._id} state={{ url: '/' }}>
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
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* latest graph  */}
        <div id="mainChart" className="mainChart">
          <div>
            <Card style={{ borderRadius: 15, border: '1px solid #10446c' }}>
              <Card.Header
                style={{
                  position: 'relative',
                  borderBottom: '1px dashed #10446c'
                }}
              >
                <Row>
                  <div className="pt-1 d-flex justify-content-between">
                    <Card.Title as="h4">
                      <b style={{ color: '#10446c', textWrap: 'nowrap' }}>Users Report</b>
                    </Card.Title>
                    <CustomDatePicker style={{ left: -200 }} fetchData={getUserStatus} />
                  </div>
                </Row>
              </Card.Header>
              <div className="pb-4 chartHeight">
                <p className="mb-0 mt-2 d-flex justify-content-center">
                  Start date: {userStatus?.startDate} to End date: {userStatus?.endDate}
                </p>
                <Doughnut
                  const
                  data={{
                    labels: ['Active Users', 'In-Active Users'],
                    datasets: [
                      {
                        label: 'Users',
                        data: [userStatus?.user?.active, userStatus?.user?.draft],
                        backgroundColor: ['rgb(0, 128, 0)', 'rgb(255, 0, 0)'],
                        hoverOffset: 4
                      }
                    ]
                  }}
                />
              </div>
            </Card>
          </div>
          <div>
            <Card style={{ borderRadius: 15, border: '1px solid #10446c' }}>
              <Card.Header
                style={{
                  position: 'relative',
                  borderBottom: '1px dashed #10446c'
                }}
              >
                <Row>
                  <div className="pt-1 d-flex justify-content-between">
                    <Card.Title as="h4">
                      <b style={{ color: '#10446c', textWrap: 'nowrap' }}> Line Chart</b>
                    </Card.Title>
                    <CustomDatePicker style={{ right: -10 }} fetchData={getProjectStatus} />
                  </div>
                </Row>
              </Card.Header>
              <div className="pb-4 chartHeight">
                <p className="d-flex justify-content-center mb-0 mt-2">
                  Start date: {projectStatus?.startDate} to End date: {projectStatus?.endDate}
                </p>
                <Line data={data} options={options} />
              </div>
            </Card>
          </div>
        </div>

        <div style={{ width: '50%', minWidth: '300px' }}>
          <Card style={{ borderRadius: 15, border: '1px solid #10446c' }}>
            <Card.Header
              style={{
                position: 'relative',
                borderBottom: '1px dashed #10446c'
              }}
            >
              <Row>
                <div className="col-5 pt-1">
                  <Card.Title as="h4">
                    <b style={{ color: '#10446c' }}>Bar Chart</b>
                  </Card.Title>
                </div>
              </Row>
            </Card.Header>
            <div className="pb-4" style={{ height: '400px' }}>
              <Bar
                data={{
                  labels: label, // Use the defined 'label' variable
                  datasets: [
                    {
                      label: 'My First Dataset',
                      data: [65, 59, 80, 81, 56, 55, 40], // Dummy data
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                      ],
                      borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                      ],
                      borderWidth: 1
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: 'top'
                    }
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'User Status'
                      }
                    },
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Number of Users'
                      }
                    }
                  }
                }}
              />
            </div>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashDefault;

function CustomDatePicker({ fetchData, style }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection; // Extract startDate and endDate
    setSelectionRange({ ...selectionRange, startDate, endDate });
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Date select button */}
      <button type="button" className="btn btn-sm btn-secondary" style={{ fontWeight: 700 }} onClick={() => setIsOpen(!isOpen)}>
        Select Date
      </button>
      {isOpen && (
        <div
          id="date-range-pickers"
          style={{
            position: 'absolute',
            zIndex: 100,
            backgroundColor: '#fff',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            borderRadius: '8px',
            overflowX: 'auto',
            ...style
          }}
        >
          {/* Transparent close button */}
          <button className="closeBtn" onClick={() => setIsOpen(false)}></button>

          {/* Date picker component */}
          <DateRangePicker
            minDate={moment().subtract(1, 'year').toDate()}
            maxDate={new Date()}
            ranges={[selectionRange]}
            onChange={handleSelect}
            locale={enGB}
          />

          {/* date filter button */}
          <div className="d-flex justify-content-end">
            <button
              style={{ fontWeight: 700 }}
              type="button"
              className="btn btn-sm btn-primary font-weight-bold"
              onClick={() => {
                fetchData(moment(selectionRange.startDate).format('YYYY-MM-DD'), moment(selectionRange.endDate).format('YYYY-MM-DD'));
                setIsOpen(false);
              }}
            >
              Filter Date
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
CustomDatePicker.propTypes = {
  fetchData: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired
};
