import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FaClock } from 'react-icons/fa';
import { FaFileInvoiceDollar } from 'react-icons/fa6';
import { Link, useLocation, useParams } from 'react-router-dom';
import 'animate.css';
import '../projectTransaction/css/payment.css';
import { AiOutlineCheckCircle, AiOutlineClockCircle } from 'react-icons/ai';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import { FaRupeeSign } from 'react-icons/fa';
import { MdPending } from 'react-icons/md';
import axios from 'axios';
import { Urls } from '../../helpers/Urls';
import moment from 'moment';
import ScaleLoader from 'react-spinners/ScaleLoader';

function PaymentDetails() {
  const params = useParams();
  const location = useLocation();
  const page = location?.state?.activePage;
  const limit = location?.state?.limit;

  let [milesotnesInfo, setMilestonesInfo] = useState([]);
  let [onlyMilestones, setOnyMilestone] = useState([]);
  let [loading, setLoading] = useState(false);

  function milestones() {
    setLoading(true);
    axios
      .get(Urls.get.getSingleMilestoneInfo + params.id)
      .then((res) => {
        console.log('Single Milestone Info :)', res);
        setMilestonesInfo(res?.data?.data);
        setOnyMilestone(res?.data?.data?.milestones);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    milestones();
  }, []);

  return (
    <div>
      <Row className="paymentMain">
        <Col>
          <Card>
            <Card.Header>
              <Row>
                <div className="col-11 ">
                  <Card.Title as="h4">
                    <b style={{ color: '#10446c' }}>
                      Project Name: &quot; {milesotnesInfo?.projectName ? milesotnesInfo?.projectName : 'Not available project name'} &quot;
                    </b>
                  </Card.Title>
                </div>
                <div className="col-1">
                  <Link to={'/projectwisepayment'} state={{ activePage: page, limit: limit }}>
                    <Button variant="danger" size="sm">
                      Back
                    </Button>
                  </Link>
                </div>
              </Row>
            </Card.Header>
            <Card.Body>
              <div style={{ borderLeft: '4px solid #10446c', borderBottom: '1px dashed #10446c', display: 'inline-block', margin: 0 }}>
                <h4 style={{ fontWeight: 'bold', color: '#3f4d67', marginLeft: '5px' }}>Budget Details</h4>
              </div>
              <Row className="pt-3">
                <div className="col-4 animate__animated animate__fadeInDown">
                  <div style={{ backgroundColor: '#f1faee', borderRadius: '10px', padding: '8px', border: '1px dashed #10446c' }}>
                    <div className=" d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <h3 className="mb-0" style={{ color: '#10446c' }}>
                          <FaRupeeSign className="cardDesign" />
                        </h3>
                        <h4 className="mx-2 mb-0" style={{ color: '#10446c' }}>
                          Total Budget
                        </h4>
                      </div>
                    </div>
                    <div>
                      <h3 className="pt-2" style={{ color: '#10446c', fontWeight: 900 }}>
                        {milesotnesInfo?.totalBudget ? milesotnesInfo?.totalBudget : '0'}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="col-4 animate__animated animate__fadeInUp">
                  <div style={{ backgroundColor: '#f1faee', borderRadius: '10px', padding: '8px', border: '1px dashed #10446c' }}>
                    <div className=" d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <h3 className="mb-0" style={{ color: '#10446c' }}>
                          <IoCheckmarkDoneCircle className="cardDesign" />
                        </h3>
                        <h4 className="mx-2 mb-0" style={{ color: '#10446c' }}>
                          Payments Done
                        </h4>
                      </div>
                    </div>
                    <div>
                      <h3 className="pt-2" style={{ color: '#198754', fontWeight: 900 }}>
                        {milesotnesInfo?.totalPaid ? milesotnesInfo?.totalPaid : '0'}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="col-4 animate__animated animate__fadeInDown">
                  <div style={{ backgroundColor: '#f1faee', borderRadius: '10px', padding: '8px', border: '1px dashed #10446c' }}>
                    <div className=" d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <h3 className="mb-0" style={{ color: '#10446c' }}>
                          <MdPending className="cardDesign" />
                        </h3>
                        <h4 className="mx-2 mb-0" style={{ color: '#10446c' }}>
                          Budget Remaining
                        </h4>
                      </div>
                    </div>
                    <div>
                      <h3 className="pt-2" style={{ color: '#D91656', fontWeight: 900 }}>
                        {milesotnesInfo?.remainingPayment ? milesotnesInfo?.remainingPayment : '0'}
                      </h3>
                    </div>
                  </div>
                </div>
              </Row>

              <div
                style={{ borderLeft: '4px solid #10446c', borderBottom: '1px dashed #10446c', display: 'inline-block', marginTop: '30px' }}
              >
                <h4 style={{ fontWeight: 'bold', color: '#10446c', marginLeft: '5px' }}>Milestones Transaction Details</h4>
              </div>

              {loading ? (
                <div className="text-center pt-4">
                  <ScaleLoader color="#10446c" />
                  <h6 className="text-danger mt-3">Loading.....</h6>
                </div>
              ) : onlyMilestones?.length === 0 ? (
                <div className="text-center pt-4">
                  <h6 className="text-danger">No milestones found ! 😥</h6>
                </div>
              ) : (
                <Row className="pt-3">
                  {onlyMilestones?.map((item, index) => {
                    const formattedDate = moment(item?.date).format('DD-MM-YYYY'); // Format: 2024-12-17
                    const formattedTime = moment(item?.date).format('hh:mm A'); // Format: 11:10 AM/PM
                    return (
                      <div className="col-sm-6 col-lg-4 animate__animated animate__fadeInUp" key={index}>
                        <Card style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #10446c' }}>
                          <div
                            style={{
                              backgroundColor: '#10446c',
                              paddingLeft: '10px',
                              paddingTop: '10px'
                            }}
                          >
                            <h4 className="text-light">
                              <b>
                                <FaFileInvoiceDollar /> {item?.title}
                              </b>
                            </h4>
                            <p style={{ color: '#ECEBDE', fontSize: '12px' }}>
                              <FaClock /> {formattedDate}, {formattedTime}
                            </p>
                          </div>

                          <div
                            style={{
                              backgroundColor: '#f1faee',
                              paddingLeft: '10px',
                              paddingTop: '10px'
                            }}
                          >
                            <Row>
                              <div className="col-12">
                                <Form.Label className="paraText">Transaction ID</Form.Label>
                                <p style={{ color: '#10446c' }}>xyz</p>
                              </div>

                              <div className="col-6">
                                <Form.Label className="paraText">Amount</Form.Label>
                                <p className="para">
                                  <b>
                                    <FaRupeeSign
                                      style={{
                                        color: '#198754',
                                        marginBottom: '2px',
                                        padding: '2px',
                                        border: '1px dashed #198754',
                                        borderRadius: '50%'
                                      }}
                                    />{' '}
                                  </b>{' '}
                                  {item?.amount}{' '}
                                </p>
                              </div>

                              <div className="col-6">
                                <Form.Label className="paraText">Status</Form.Label>
                                <br />
                                <b
                                  className={`badge ${
                                    item.status === 'pending' ? 'bg-warning' : item.status === 'paid' ? 'bg-success' : 'bg-danger'
                                  }`}
                                >
                                  {item?.status === 'paid' && <AiOutlineCheckCircle style={{ marginRight: '4px' }} />}
                                  {item?.status === 'pending' && <AiOutlineClockCircle style={{ marginRight: '4px' }} />}
                                  {item.status}
                                </b>
                              </div>
                            </Row>
                          </div>
                        </Card>
                      </div>
                    );
                  })}
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PaymentDetails;

{
  /* <div className="col-4">
<Card style={{ borderRadius: '8px', overflow: 'hidden' }}>
  <div
    style={{
      backgroundColor: '#8b0f4e',
      paddingLeft: '10px',
      paddingTop: '10px'
    }}
  >
    <h4 className="text-light">
      <b>
        <FaFileInvoiceDollar /> Milestone 1{' '}
      </b>
    </h4>
    <p style={{ color: '#ECEBDE', fontSize: '12px' }}>
      {' '}
      <FaClock /> 09:23 AM, 2024-01-15
    </p>
  </div>

  <div
    style={{
      backgroundColor: '#F5F0CD',
      paddingLeft: '10px',
      paddingTop: '10px'
    }}
  >
    <Row>
      <div className="col-12">
        <Form.Label style={{ fontWeight: 'bold', color: '#8b0f4e' }}>Transaction ID</Form.Label>
        <p style={{ color: 'black', fontSize: '12px' }}>78578JDIFJDFHSDFB57843</p>
      </div>

      <div className="col-6">
        <Form.Label style={{ fontWeight: 'bold', color: '#8b0f4e' }}>Amount</Form.Label>
        <p style={{ color: 'black', fontSize: '12px' }}>300000</p>
      </div>
      <div className="col-6">
        <Form.Label style={{ fontWeight: 'bold', color: '#8b0f4e' }}>Status</Form.Label>
        <p style={{ color: 'black', fontSize: '12px' }}>Pending</p>
      </div>
    </Row>
  </div>
</Card>
</div> */
}
